import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../product/services/product.service';

@Component({
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Output() delete: EventEmitter<number> = new EventEmitter();

  @Input()
  public product: any;
  @Input()
  public index : number;

  public imgSrc: string;
  public price: number;
  public tshirtName: string;

  constructor(
    private productService : ProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getProductById(this.product["tshirtId"]).subscribe(
      (val) => {
        console.log(val);
        this.imgSrc = val.tshirt.image; // .substr(5);
        this.price = val.tshirt.price;
        this.tshirtName = val.tshirt.tshirtName;

      },
      (error) => {console.log(error)}
    );
  }

  test(){
    console.log("ok");
    console.log(this.product);
  }

  deleteMe() {
    console.log("here should be the action");
    this.delete.emit(this.index);
  }

}
