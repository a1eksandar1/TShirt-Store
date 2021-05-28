import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TShirt } from 'src/app/models/tshirt.model';
import { JwtService } from 'src/app/services/common/jwt.service';
<<<<<<< HEAD
=======
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { OrderService } from '../../cart/services/order.service';
>>>>>>> 16e0d6f17d8aca16bcd30115b895060a0b8946a7
import { ProductService } from '../../product/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  private urls = {
    postTShirt: "http://localhost:3000/tshirts/"
  };

  constructor(private http: HttpClient, private jwtService: JwtService, private cart: ProductService, private router: Router, private toast: ToastService) { }

  createTShirt(selectedFile: File, tshirtName: string, price: number, agreeToShow: boolean): HttpRequest<FormData> {
    const formData: FormData = new FormData();
    formData.append("image", selectedFile);
    formData.append("tshirtName", tshirtName);
    formData.append("price", price.toString());
    formData.append("agreeToShow", agreeToShow.toString());
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
    return req;//this.http.request<FormData>(req);
  }
}
