import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartIsEmpty : boolean;
  public cartItemsArray: any[];
  public userID: string;

  constructor(
    private authService : AuthService,
    public toastService: ToastService,
    private localStorageService: LocalStorageService
  ){
    if(!this.authService.isLoggedIn()){
      this.toastService.errorToast("Ne treba da mu se dozvoli uopste da udje ovde ako nije ulogovan, to tamo routing");
    }
    this.userID = this.authService.sendUserDataIfExists()._id;
    let cartItems = this.localStorageService.getItem(this.userID);
    if(cartItems == null){
      // prikazi samo "Cart is empty i link ka store-u"
      this.cartIsEmpty = true;
      return;
    }
    this.cartIsEmpty = false;
    cartItems = "["+cartItems.split(`\n`).join(",")+"]";
    this.cartItemsArray = JSON.parse(cartItems);
  }

  ngOnInit(): void {
  }


  deleteUser(index: number) {
    this.cartItemsArray = this.cartItemsArray.filter((d, i) => index !== i);
    this.updateLocalStorage(this.cartItemsArray);
  }

  updateLocalStorage(newStorageData : any){
    if(this.cartItemsArray.length == 0){
      this.localStorageService.removeItem(this.userID);
    }else{
      newStorageData = JSON.stringify(newStorageData).split(`},`).join(`}\n`).slice(1, -1);
      this.localStorageService.setItem(this.userID, newStorageData);
    }
  }

}
