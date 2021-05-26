import { Order } from './../../../models/order.model';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../product/services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TShirt } from 'src/app/models/tshirt.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input()
  public order: Order;

  public product : Observable<{tshirt : TShirt}>;
  private productId : string;

  constructor(
    private productService : ProductService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,) {
      // this.product = this.activatedRoute.paramMap.pipe(
      //   switchMap((params : ParamMap) => {
      //     this.productId = params.get('_id');
      //     console.log(this.productId);
      //     return this.productService.getProductById(this.productId);
      //   })
      // );
    }

  ngOnInit(): void {
  }

  test(){
    console.log("ok");
  }

}
