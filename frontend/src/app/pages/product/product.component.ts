import { Component, OnInit } from '@angular/core';
import { TShirt } from 'src/app/models/tshirt.model';

enum TShirtSize {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
  EXTRALARGE = 3,
}

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

  // public _id: number = 1,
  // public name: string = "Majica",
  // public price: number = 1,
  // public image: string = "",
  // public comments: string = ""

  // kako jadan product page mogu da napravim sa 3 informacije hahhahahahah

  public tshirt : TShirt;
  public tshirtSize : TShirtSize;

  // da li da primam celu majcu ili mozda bolje samo id majce pa cu ja da zovem bazu da uzmem, nemam pojma sta je bolje
  constructor() {
    this.tshirt = new TShirt();
    this.tshirtSize = TShirtSize.SMALL;
   }

  ngOnInit(): void {
  }


  setTShirtSize(size : number){
    this.tshirtSize = TShirtSize[TShirtSize[size]];
  }

  // (click)="setTShirtSize({{TShirtSize.SMALL}})"

  // changeRating(newRating : number){
  //   this.rating = newRating;
  // }

}
