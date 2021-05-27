import { TShirt } from './../../../models/tshirt.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { JwtService } from 'src/app/services/common/jwt.service';
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urls = {
    getProductById: "http://localhost:3000/tshirts",
    postComment: "http://localhost:3000/tshirts",
    rateProduct: "http://localhost:3000/tshirts",
    backend: "http://localhost:3000/",
  }

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    public toastService: ToastService,
    private localStorageService: LocalStorageService,
    private authService : AuthService
  ) { }

  public getProductById(productId : string) : Observable<{tshirt : TShirt}>{
    return this.http.get<{tshirt : TShirt}>(`${this.urls.getProductById}/${productId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const serverError: { message: string; status: number; stack: string } = error.error;
        window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
        return null;
      }),
      map((response: {tshirt : TShirt}) => {
        // console.log(response);
      return response;
    }));
  }

  public postComment(tshirtName: string, comment: string){
    const myFormData = { tshirtName: tshirtName, comment: comment };
    return this.http.post(
      `${this.urls.postComment}/${tshirtName}`,
      myFormData,
      this.getRequestOptionsWithAuth()
    ).pipe(
      catchError((error: HttpErrorResponse) => {return null;}),
    );
  }

  public rateProduct(rating: number, productId : string){
    const myFormData = { "rating" : rating.toString() };
    return this.http.post(
      `${this.urls.rateProduct}/${productId}/addRating`,
      myFormData,
      this.getRequestOptionsWithAuth()
    ).pipe(
      catchError((error: HttpErrorResponse) => {return null;}),
    );
  }

  private getRequestOptionsWithAuth(){
    return {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`),
    };
  }

  public addProductToCart(productId : string, size : number, quantity : number){

    if(!this.authService.isLoggedIn()){
      this.toastService.errorToast("You must be logged in to use this feature.");
      return;
    }

    // quantity uvek 1 jer sam to zaboravio da dodam i UI
    let userID = this.authService.sendUserDataIfExists()._id;
    let cartItem = { tshirtId: productId, size: size, quantity: quantity }

    if(this.localStorageService.getItem(userID) == null){
      console.log("nema ordere");
      console.log(JSON.stringify(cartItem));
      this.localStorageService.setItem(userID, JSON.stringify(cartItem));
    }else{
      console.log("puna korpa");
      let previousItems = this.localStorageService.getItem(userID);
      this.localStorageService.setItem(userID, previousItems + `\n` + JSON.stringify(cartItem));
    }
    this.toastService.successToast("Item added to cart!");
  }

  getImageSrc(imgSrc : string): string {
    return this.urls.backend + imgSrc;
  }

}
