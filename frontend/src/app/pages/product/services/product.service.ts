import { TShirt } from './../../../models/tshirt.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { JwtService } from 'src/app/services/common/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urls = {
    getProductById: "http://localhost:3000/tshirts",
    postComment: "http://localhost:3000/tshirts",
    rateProduct: "http://localhost:3000/tshirts",
  }

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
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



  // getAllOrders(){
  //   // const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

  //   const requestOptions = {
  //     headers: new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`),
  //   };

  //   return this.http.get(this.urls.getAllOrders, requestOptions).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       const serverError: { message: string; status: number; stack: string } = error.error;
  //       window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
  //       return null;
  //     }),
  //     map((response: any) => {
  //       // console.log(response);
  //     return response;
  //   }));
  // }


}
