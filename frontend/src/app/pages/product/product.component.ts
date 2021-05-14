import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // ovo treba dodati u model
  // msm i ne moramo
  // necu onda jos da dodajem rating sistem
  // rating = 4.5;
  // numberOfRatings = 20;

  constructor() { }

  ngOnInit(): void {
  }

  // changeRating(newRating : number){
  //   this.rating = newRating;
  // }

}
