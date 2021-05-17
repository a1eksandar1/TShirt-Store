import { Injectable } from "@angular/core";
import { IJWTTokenData } from "./models/jwt-token-data.model";

@Injectable({
  providedIn: "root"
})
export class JwtService {
  private static readonly TOKENID: string = "JWT_TOKEN";

  constructor() {}

  public getToken(): string | null {
    const token: string | null = localStorage.getItem(JwtService.TOKENID);
    if (!token) {
      return null;
    }
    return token;
  }

  public getDataFromToken(): IJWTTokenData {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const payloadString = token.split(".")[1];
    const userDataJSON = window.atob(payloadString);
    const payload: IJWTTokenData = JSON.parse(userDataJSON);
    return payload;
  }

  public setToken(jwt: string): void {
    localStorage.setItem(JwtService.TOKENID, jwt);
  }

  public removeToken(): void {
    localStorage.removeItem(JwtService.TOKENID);
  }
}
