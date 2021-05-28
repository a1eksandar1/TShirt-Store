import { Injectable } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { JwtService } from "src/app/services/common/jwt.service";
import { map, catchError } from "rxjs/operators";
import { IJWTTokenData } from './common/models/jwt-token-data.model';
import { ToastService } from '../ui/toast/service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSubject: Subject<User> = new Subject<User>();
  public readonly user: Observable<User> = this.userSubject.asObservable();

  private readonly urls = {
    registerUser: "http://localhost:3000/users/signup/",
    loginUser: "http://localhost:3000/users/login/"
  };

  constructor(private http: HttpClient, private jwtService: JwtService, private toast: ToastService) { }

  public isLoggedIn(): boolean {
    return (this.jwtService.getToken() != null);
  }

  public isAdmin(): boolean {
    return this.jwtService.getDataFromToken().isAdmin;
  }

  public sendUserDataIfExists(): User {
    const payloadData: IJWTTokenData = this.jwtService.getDataFromToken();
    const user: User = payloadData
      ? new User(payloadData._id, payloadData.email, payloadData.username,payloadData.isAdmin,payloadData.wishlist)
      : null;
    this.userSubject.next(user);
    //console.log(user);
    return user;
  }

  public registerUser(username: string, password: string, email: string): Observable<string> {
    const body = { email, username, password};
    return this.http.post<{ message: string }>(this.urls.registerUser, body).pipe(
      catchError((error: HttpErrorResponse) => this.handleErrorRegistration(error)),
      map((response: { message: string }) => this.checkRegistration(response))
    );
  }

  public loginUser(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<{ token: string }>(this.urls.loginUser, body).pipe(
      catchError((error: HttpErrorResponse) => this.handleErrorLogin(error)),
      map((response: { token: string }) => this.mapResponseToUser(response))
    );
  }

  public logoutUser(): void {
    this.jwtService.removeToken();
    this.userSubject.next(null);
  }

  private handleErrorLogin(error: HttpErrorResponse): Observable<{ token: string }> {
    const serverError: { message: string; status: number; stack: string } = error.error;
    this.toast.errorToast(serverError.message)
    //window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
    return of({ token: this.jwtService.getToken() });
  }

  private handleErrorRegistration(error: HttpErrorResponse): Observable<{ message: string }> {
    const serverError: { message: string; status: number; stack: string } = error.error;
    this.toast.errorToast(serverError.message)
    //window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
    return of({ message: serverError.message });
  }

  private mapResponseToUser(response: { token: string }): User {
    //console.log(response);
    if(response.token != null)
      this.jwtService.setToken(response.token);
    return this.sendUserDataIfExists();
  }

  private checkRegistration(response: { message: string }): string {
    console.log(response);
    return response.message;
  }

  public addToWishlist(tshirtId: string): void{
    let user = this.sendUserDataIfExists();
    user.wishlist.push(tshirtId);
    this.userSubject.next(user);
    console.log("Wishlist: ", user.wishlist);
  }
  public removeFromWishlist(tshirtId: string): void{
    let user = this.sendUserDataIfExists();
    user.wishlist = user.wishlist.filter((value: string) => (value!=tshirtId));
    this.userSubject.next(user);
    console.log("Wishlist: ", user.wishlist);
  }

}
