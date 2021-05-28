import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { TShirt } from './../../models/tshirt.model';
import { ProductService } from './../product/services/product.service';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable, SubscribableOrPromise, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from './services/order.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck, OnDestroy, OnChanges {
  public userObs: Observable<User>;
  public userSub: Subscription;
  public user : User;

  currTshirt : TShirt;
  public wishlistItems : TShirt[] = [];
  // public wishlistIDs : string[] = [];
  public userOrders : Order[] = [];

  constructor(
    private authService: AuthService,
    private productService : ProductService,
    private orderService : OrderService,
    private localStorageService : LocalStorageService
  ) {
    this.initUserPage();
    this.getUserWishlist();
    this.getUserOrders(this.user._id);
  }

  getUserOrders(userId : string){
    // console.log(userId);
    this.orderService.getOrders(userId).subscribe(
      (val) => {
        this.userOrders = this.userOrders.concat(val.allOrders);
        console.log(this.userOrders);
      });
    // console.log(this.userOrders);
  }

  getUserWishlist(){

    let userWishlistStr = this.localStorageService.getItem("WISHLIST");

    let wishlist: string[];
    if(userWishlistStr == null || userWishlistStr.length === 0){
      wishlist = [];
    }else{
      wishlist = JSON.parse(userWishlistStr);
    }
    this.localStorageService.setItem("WISHLIST", JSON.stringify(wishlist));

    console.log(wishlist);
    for(let i = 0; i < wishlist.length; i++){
      this.productService.getProductById(wishlist[i]).subscribe(
        (val) => {this.currTshirt = val.tshirt; this.wishlistItems.push(this.currTshirt);},
        (error) => {console.log(error);}
      );
    }
  }

  initUserPage(){
    this.userObs = this.authService.user;
    this.userSub = this.userObs.subscribe((user: User) => {
      this.user = user;
      // console.log(user);
    });
    this.authService.sendUserDataIfExists();

    setTimeout(() => {
      //this.authService.sendUserDataIfExists();
    }, 0);
  }

  ngDoCheck(): void {
    this.authService.sendUserDataIfExists();
  }

  ngOnInit(): void {
    this.authService.sendUserDataIfExists();
  }

  ngOnDestroy(): void {
    this.userSub ? this.userSub.unsubscribe() : null;
  }

  ngOnChanges() {
    this.authService.sendUserDataIfExists();

  }

}
