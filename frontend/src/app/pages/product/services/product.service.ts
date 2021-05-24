import { TShirt } from './../../../models/tshirt.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urls = {
    getProductById: "http://localhost:3000/tshirts"
  }

  constructor(private http: HttpClient) { }

  public getProductById(productId : string) : Observable<TShirt>{
    return this.http.get<TShirt>(`${this.urls.getProductById}/${productId}`);
  }

}
