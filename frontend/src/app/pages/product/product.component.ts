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

  public rating : number;
  public numberOfRatings : number;


  constructor(
    private productService : ProductService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
  ) {
    this.product = this.activatedRoute.paramMap.pipe(
      switchMap((params : ParamMap) => {
        const productId: string = params.get('_id');
        return this.productService.getProductById(productId);
      })
    );
    this.rating = 3.3;
    this.numberOfRatings = 20;
  }

  ngOnInit(): void {
  }


  setTShirtSize(size : number){
  }

  changeRating(newRating : number){
    this.rating = newRating;
  }

  simpleFunction(tshirtName: string, comment: string){
    if(comment.trim().length == 0){
      return;
    }
    this.productService.postComment(tshirtName, comment).subscribe();
  }

}
