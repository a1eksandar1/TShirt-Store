import { TShirt } from './../../../models/tshirt.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urls = {
    getProductById: "http://localhost:3000/tshirts",
    postComment: "http://localhost:3000/tshirts"
  }

  constructor(
    private http: HttpClient,
  ) { }

  public getProductById(productId : string) : Observable<{tshirt : TShirt}>{
    return this.http.get<{tshirt : TShirt}>(`${this.urls.getProductById}/${productId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const serverError: { message: string; status: number; stack: string } = error.error;
        window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
        return null;
      }),
      map((response: {tshirt : TShirt}) => {
        console.log(response);
      return response;
    }));
  }

  public postComment(tshirtName: string, comment: string) : Observable<{ok : boolean}>{
    const body = { tshirtName, comment};
    return this.http.post<{ message: string }>(`${this.urls.postComment}/${tshirtName}`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        const serverError: { message: string; status: number; stack: string } = error.error;
        window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
        return null;
      }),
      map((response: {ok : boolean}) => {
      return response;
    }));
  }

}
