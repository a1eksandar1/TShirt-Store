import { ProductService } from './../product/services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartIsEmpty : boolean;
  public cartItemsArray: any[];
  public userID: string;
  public totalCost : number = 0;

  public shippingInfoForm: FormGroup;

  constructor(
    private authService : AuthService,
    public toastService: ToastService,
    private localStorageService: LocalStorageService,
    private productService : ProductService
  ){
    this.initForm();
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
    this.fixQuantity();
  }

  fixQuantity(){
    this.cartItemsArray.sort(
      (a, b) => {
        if (a["tshirtId"] < b["tshirtId"]) return -1;
        else if (a["tshirtId"] > b["tshirtId"]) return 1;
        else if(a["size"] < b["size"]) return -1;
        else return 1;
      }
    );
    for(let i = 0; i < this.cartItemsArray.length-1; i++){
      if(this.cartItemsArray[i]["tshirtId"] === this.cartItemsArray[i+1]["tshirtId"] &&
         this.cartItemsArray[i]["size"] === this.cartItemsArray[i+1]["size"])
      {
        this.cartItemsArray[i]["quantity"] += this.cartItemsArray[i+1]["quantity"];
        this.cartItemsArray.splice(i+1, 1);
        i--;
      }
    }
  }

  ngOnInit(): void {
  }

  initForm(){
    this.shippingInfoForm = new FormGroup({
      phone: new FormControl(''),
      streetAddress: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      zipcode: new FormControl(''),
    });
  }


  finalize(){
    const formData = this.shippingInfoForm.value;

    let userId = this.authService.sendUserDataIfExists()["_id"];
    if(userId == null){
      this.toastService.errorToast("You must be logged in to place an order.");
      return;
    }

    for(let i = 0; i < this.cartItemsArray.length; i++){
      this.productService.placeAnOrder(
        this.cartItemsArray[i]["tshirtId"],
        userId,
        false,
        this.cartItemsArray[i]["size"],
        this.cartItemsArray[i]["quantity"],
        [formData.streetAddress, formData.city, formData.country, formData.zipcode].join(", "),
        formData.phone
      ).subscribe(
        (val) => {console.log(val)},
        (error) => {
          console.log(error);
        }
      );
    }

    // neki error checking bi mogo da pogledam

    while(this.cartItemsArray.length != 0){
      this.cartItemsArray.pop();
    }
    this.localStorageService.clear();
    this.toastService.successToast("All orders sent successfully");
  }


  deleteItem(index: number) {
    this.cartItemsArray = this.cartItemsArray.filter((d, i) => index !== i);
    this.updateLocalStorage(this.cartItemsArray);
  }

  totalCosthandler(cartItemCost: number){
    this.totalCost += cartItemCost;
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
