import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/services/common/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  private urls = {
    postTShirt: "http://localhost:3000/tshirts/"
  };

  constructor(private http: HttpClient, private jwtService: JwtService) { }

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
    this.http.request<FormData>(req).subscribe(() => {
      //console.log("subscribed");
    });
    //console.log(selectedFile);
  }
}
