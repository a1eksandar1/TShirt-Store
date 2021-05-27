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

  public imgSrc: string = "/assets/tshirtDefault.png";
  public price: number;
  public tshirtName: string;

  constructor(
    public productService : ProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getProductById(this.product["tshirtId"]).subscribe(
      (val) => {
        this.imgSrc = this.productService.getImageSrc(val.tshirt.image)
        this.price = val.tshirt.price;
        this.tshirtName = val.tshirt.tshirtName;
      },
      (error) => {console.log(error)}
    );
  }

  getSize(){
    switch(this.product.size){
      case 0 : return "Small";
      case 1 : return "Medium";
      case 2 : return "Large";
      case 3 : return "Extra large";
    }
  }

  deleteMe() {
    this.delete.emit(this.index);
  }

}
