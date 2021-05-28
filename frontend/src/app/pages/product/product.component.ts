import { LocalStorageService } from './../../services/localstorage/local-storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TShirt } from 'src/app/models/tshirt.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, share } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  public product : Observable<{tshirt : TShirt}>;
  public tshirt : TShirt;

  public user : User;
  loginSub: Subscription;
  productSub: Subscription;

  private productId : string;
  public hoverRating : number = 0;
  private size : number = 0;
  private commentTextArea : string = " ";
  public quantityInput : number = 1;
  public isFavorited = false;

  constructor(
    private productService : ProductService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
    public toastService: ToastService,
    public _router : Router,
    public localStorageService : LocalStorageService
  ) {
    this.initPage();
    if(this.authService.isLoggedIn() == true){
      this.user = this.authService.sendUserDataIfExists();
    }
  }

  // ovo je nesto cudno, radi ali ja nznm kako, ako ima vremena moram da provalim

  public ngOnDestroy(): void {
    this.loginSub ? this.loginSub.unsubscribe() : null;
    this.productSub ? this.productSub.unsubscribe() : null;
  }

  initPage(){
    this.product = this.activatedRoute.paramMap.pipe(
      switchMap((params : ParamMap) => {
        this.productId = params.get('_id');
        return this.productService.getProductById(this.productId);
      }),
      share()
    )
    this.productSub = this.product.subscribe(
      (val) => { console.log(val); this.tshirt = val.tshirt; },
      (error) => {console.log(error);}
    );

    this.loginSub = this.authService.user.subscribe(
      (u) => {
        this.user = u;
        if(this.user != null){
          this.productService.initWishlistLocally(this.user);
          this.isFavorited = this.checkIfProductInUserWishlist();
        }
      }
    );
  }

  ngOnInit(): void {
  }

  changeRating(userRating : number){
    if(!this.authService.isLoggedIn()){
      this.toastService.errorToast('You must be logged in to leave a rating.');
      return;
    }
    const obs = this.productService.rateProduct(userRating, this.productId);

    obs.subscribe(
      (val)=>{
        this.tshirt.numberOfRatings++;
        this.tshirt.ratingSum += userRating;
        this.toastService.successToast('Your rating has been submitted!');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newComment(tshirtName: string, comment: string){
    if(comment.trim().length == 0){
      return;
    }
    if(!this.authService.isLoggedIn()){
      this.toastService.errorToast('You must be logged in to comment');
      return;
    }
    const obs = this.productService.postComment(tshirtName, comment);
    obs.subscribe(
      (val)=>{
        this.tshirt.comments.push(comment);
        this.toastService.successToast('Posted!');
        this.commentTextArea = " ";
      },
      (error) => {console.log(error);}
    );
  }

  setTShirtSize(size : number){
    this.size = size;
  }

  addItemToCartAndGoToCart(){
    this.productService.addProductToCart(this.productId, this.size, this.quantityInput);
    this._router.navigate(['/cart']);
  }

  public toggleFavorited() {

    if(!this.authService.isLoggedIn()){
      this.toastService.errorToast("You must be logged in to use this feature.")
      return;
    }

    // ovde obavezno proveriti dal je ulogovan i ako nije nedas nista jebes sve druge funkcije

    // console.log(this.userWishlist);
    // let user = this.authService.sendUserDataIfExists();
    // if(user == null){
    //   this.toastService.errorToast("You must be logged in to use this feature.")
    //   return;
    // }

    this.isFavorited = !this.isFavorited;
    if(this.isFavorited){
      console.log("add to wishlist");
      this.productService.addToWishlist(this.user._id, this.productId).subscribe(
        (val) => {
          console.log(val);
          this.toastService.successToast("Product added to wishlist!");
          // this.authService.addToWishlist(this.productId);
        },
        (error) => {console.log(error); this.toastService.errorToast("Product was not added to wishlist.");}
      );
      this.addProductToWishlistLocally();
    }else{
      console.log("remove from wishlist");
      this.productService.removeFromWishlist(this.user._id, this.productId).subscribe(
        (val) => {
          console.log(val);
          this.toastService.successToast("Product removed from wishlist!");
          // this.authService.removeFromWishlist(this.productId);
        },
        (error) => {console.log(error); this.toastService.errorToast("Product was not removed from wishlist.");}
      );
      this.removeProductFromWishlistLocally();
    }
  }

  checkIfProductInUserWishlist(){
    console.log("check");
    let userWishlistStr = this.localStorageService.getItem("WISHLIST");
    if(userWishlistStr == null || userWishlistStr.length === 0){
      this.isFavorited = false;
      return;
    }

    return JSON.parse(userWishlistStr).includes(this.productId);
  }

  addProductToWishlistLocally(){
    // mogu da se zovu samo na product page-u
    let userWishlistStr = this.localStorageService.getItem("WISHLIST");

    let wishlist: string[];
    if(userWishlistStr == null || userWishlistStr.length === 0){
      wishlist = [this.productId];
    }else{
      wishlist = JSON.parse(userWishlistStr);
      if(!wishlist.includes(this.productId))
        wishlist.push(this.productId);
    }
    this.localStorageService.setItem("WISHLIST", JSON.stringify(wishlist));
  }

  removeProductFromWishlistLocally(){
    let userWishlistStr = this.localStorageService.getItem("WISHLIST");

    let wishlist: string[];
    if(userWishlistStr == null || userWishlistStr.length === 0){
      return;
    }
    wishlist = JSON.parse(userWishlistStr);
    if(wishlist.includes(this.productId)){
      const index = wishlist.indexOf(this.productId, 0);
      console.log(index);
      wishlist.splice(index, 1);
      this.localStorageService.setItem("WISHLIST", JSON.stringify(wishlist));
    }
  }

  tellUserToLogIn(message : string){
    this.toastService.show(message, {
      classname: 'bg-warning text-dark',
      delay: 3000 ,
      autohide: true,
    });
    document.getElementById("openLoginModalButton").click();
  }

}
