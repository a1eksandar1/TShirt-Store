import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Shop } from 'src/app/models/shop.model';
import { shopsResponse } from './models/shopResponse.model';



@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private readonly shopsSubject: Subject<Shop[]> = new Subject<Shop[]>();
  public readonly shops: Observable<Shop[]> = this.shopsSubject.asObservable();

  private readonly urls = {
    tshirts: "http://localhost:3000/shops/"
  }

  constructor( private http: HttpClient ) { }

  public getShirts(): Observable<shopsResponse> {
    return this.http.get<shopsResponse>(this.urls.tshirts)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const serverError: { message: string; status: number; stack: string } = error.error;
        window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
        return null;
      }),
      map((response: shopsResponse) => {
      this.shopsSubject.next(response.tshirtsAvailable);
      return response;
    }));
  }



}




@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly tshirtsSubject: Subject<TShirt[]> = new Subject<TShirt[]>();
  public readonly tshirts: Observable<TShirt[]> = this.tshirtsSubject.asObservable();

  private readonly urls = {
    tshirts: "http://localhost:3000/tshirts/"
  }

  constructor( private http: HttpClient ) { }

  public getShirts(): Observable<tshirtsResponse> {
    return this.http.get<tshirtsResponse>(this.urls.tshirts)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const serverError: { message: string; status: number; stack: string } = error.error;
        window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
        return null;
      }),
      map((response: tshirtsResponse) => {
      this.tshirtsSubject.next(response.tshirtsAvailable);
      return response;
    }));
  }
}
