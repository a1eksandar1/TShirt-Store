import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TShirt } from 'src/app/models/tshirt.model';
import { JwtService } from 'src/app/services/common/jwt.service';
import { OrderService } from '../../cart/services/order.service';
import { ProductService } from '../../product/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  private urls = {
    postTShirt: "http://localhost:3000/tshirts/"
  };

  constructor(private http: HttpClient, private jwtService: JwtService, private cart: ProductService, private router: Router) { }

  createTShirt(selectedFile: File, tshirtName: string, price: number) {
    const formData: FormData = new FormData();
    formData.append("image", selectedFile);
    formData.append("tshirtName", tshirtName);
    formData.append("price", price.toString());
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

    const req: HttpRequest<FormData> = new HttpRequest<FormData>(
      "POST",
      this.urls.postTShirt,
      formData,
      {
        headers,
        reportProgress: false
      }
    );
    this.http.request<FormData>(req).subscribe((response: HttpResponse<FormData>) => {
      //console.log("subscribed");
      // console.warn("response from", req)
      // console.log(response);
      // console.log(response.body);
      if(typeof response.body != "undefined")
      {
        let id = response.body["addedTshirt"]["_id"];
        //this.cart.addProductToCart(id,1,1);
        //console.log(id);
        this.router.navigateByUrl("/product/" + id);
      }
    });
    //console.log(selectedFile);
  }
}
