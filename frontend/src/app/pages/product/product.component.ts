import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TShirt } from 'src/app/models/tshirt.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { ProductService } from './services/product.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product : Observable<{tshirt : TShirt}>;
  public tshirt : TShirt;

  private productId : string;
  private size : number;
  private commentTextArea : string = " ";

  constructor(
    private productService : ProductService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
    public toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {
    this.product = this.activatedRoute.paramMap.pipe(
      switchMap((params : ParamMap) => {
        this.productId = params.get('_id');
        return this.productService.getProductById(this.productId);
      })
    )
    this.product.subscribe((val) => {
      this.tshirt = val.tshirt;
    });
  }

  ngOnInit(): void {
  }

  public addProductToCart(){

    if(!this.authService.isLoggedIn()){
      this.errorToast("You must be logged in to use this feature.");
      return;
    }

    // quantity uvek 1 jer sam to zaboravio da dodam i UI
    let userID = this.authService.sendUserDataIfExists()._id;
    let cartItem = { tshirtId: this.productId, size: this.size, quantity: 1 }

    if(this.localStorageService.getItem(userID) == null){
      console.log("nema ordere");
      this.localStorageService.setItem(userID, JSON.stringify(cartItem));
    }else{
      console.log("puna korpa");
      let previousItems = this.localStorageService.getItem(userID);
      this.localStorageService.setItem(userID, previousItems + `\n` + JSON.stringify(cartItem));
    }
    this.successToast("Item added to cart!");
  }

  changeRating(userRating : number){
    const obs = this.productService.rateProduct(userRating, this.productId);

    obs.subscribe(
      (val)=>{
        this.tshirt.numberOfRatings++;
        this.tshirt.ratingSum += userRating;
        this.successToast('Your rating has been submitted!');
      },
      (error) => {
        this.errorToast('You must be logged in to leave a rating.');
      }
    );
  }

  newComment(tshirtName: string, comment: string){
    if(comment.trim().length == 0){
      return;
    }
    const obs = this.productService.postComment(tshirtName, comment);
    obs.subscribe(
      (val)=>{
        this.tshirt.comments.push(comment);
        this.successToast('Posted!');
        this.commentTextArea = " ";
      },
      (error) => {
        this.errorToast('You must be logged in to comment');
      }
    );
  }

  successToast(message : string){
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
    });
  }

  errorToast(message : string){
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
    });
  }

  setTShirtSize(size : number){
    this.size = size;
  }

}
