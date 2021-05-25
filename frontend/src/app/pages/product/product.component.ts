import { AuthService } from './../../services/auth.service';
import { ProductService } from './services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { TShirt } from 'src/app/models/tshirt.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product : Observable<{tshirt : TShirt}>;
  private productId : string;

  constructor(
    private productService : ProductService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
  ) {
    this.product = this.activatedRoute.paramMap.pipe(
      switchMap((params : ParamMap) => {
        this.productId = params.get('_id');
        console.log(this.productId);
        return this.productService.getProductById(this.productId);
      })
    );
  }

  ngOnInit(): void {
  }

  changeRating(userRating : number){

    this.productService.rateProduct(1, this.productId);
  }

  setTShirtSize(size : number){
  }

  simpleFunction(tshirtName: string, comment: string){
    if(comment.trim().length == 0){
      return;
    }
    this.productService.postComment(tshirtName, comment);
  }

}
