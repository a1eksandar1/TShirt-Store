import { ProductService } from 'src/app/pages/product/services/product.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly urls = {
    userOrders: "http://localhost:3000/orders/user",
    sendEmail: "http://localhost:3000/orders/sendEmail"
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  public getOrders(userId : string) : Observable<{numOfOrders: number, allOrders: Order[]}>
  {
    return this.http.get<Observable<{numOfOrders: number, allOrders: Order[]}>>(
      `${this.urls.userOrders}/${userId}`,
      this.productService.getRequestOptionsWithAuth()
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        const serverError: { message: string; status: number; stack: string } = error.error;
        window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
        return null;
      }),
      map((response : {numOfOrders: number, allOrders: Order[]}) => {
        return response;
    }));
  }

  public sendEmail(email : string){
    const myFormData = { "userEmail" : email };
    return this.http.post(
      this.urls.sendEmail,
      myFormData,
      this.productService.getRequestOptionsWithAuth()
    ).pipe(
      catchError((error: HttpErrorResponse) => {console.log(error); return null;}),
    );
  }
}
