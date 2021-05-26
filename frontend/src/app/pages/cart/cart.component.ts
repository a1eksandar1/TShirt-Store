import { OrderService } from './services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private allOrders : Observable<any>;
  private numberOfOrders : number;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
  }

  test(){
    console.log("ok-main");
    this.allOrders = this.orderService.getAllOrders();
    console.log(this.allOrders);
    this.allOrders.subscribe(val => {
      console.log(val);
      this.numberOfOrders = val.numberOfOrders;
      console.log(this.numberOfOrders);
    });
  }

}
