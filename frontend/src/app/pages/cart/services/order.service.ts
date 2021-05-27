import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/services/common/jwt.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urls = {
    getAllOrders: "http://localhost:3000/orders/"
  };

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getAllOrders(){
    // const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

    const requestOptions = {
      headers: new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`),
    };

    return this.http.get(this.urls.getAllOrders, requestOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        const serverError: { message: string; status: number; stack: string } = error.error;
        window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
        return null;
      }),
      map((response: any) => {
        // console.log(response);
      return response;
    }));
  }
}
