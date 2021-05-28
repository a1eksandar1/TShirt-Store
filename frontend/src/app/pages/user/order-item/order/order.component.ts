import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { ProductService } from 'src/app/pages/product/services/product.service';

@Component({
  selector: '[app-order]',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input()
  public order : Order;
  public imgSrc : string;
  public tshirtName : string;
  public price : number;

  constructor(
    public productService : ProductService,
  ) {}

  ngOnInit(): void {
    console.log(this.order.tshirtId);

    this.productService.getProductById(this.order.tshirtId).subscribe(
      (val) => {
        this.imgSrc = this.productService.getImageSrc(val.tshirt.image)
        this.price = val.tshirt.price;
        this.tshirtName = val.tshirt.tshirtName;
      },
      (error) => {console.log(error)}
    );
  }

}

