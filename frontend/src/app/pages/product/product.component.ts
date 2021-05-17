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

  // public _id: number = 1,
  // public name: string = "Majica",
  // public price: number = 1,
  // public image: string = "",
  // public comments: string = ""  koments trenutno je samo jedan jedini string? Treba da bude niz comment modela

  TShirtSizeEnum = TShirtSize;

  public tshirt : TShirt;
  // necemo avalible sizes da dodajemo u model nek bude da su uvek sve velicine dostupne, ali treba dodati u order model
  public tshirtSize : TShirtSize;
  //treba dodati rating i numberOfRatings u model
  public rating : number;
  public numberOfRatings : number;

  //keep in mind primam tshirt id kroz url
  constructor() {
    this.tshirt = new TShirt();
    this.tshirtSize = TShirtSize.SMALL;
    this.rating = 4.5;
    this.numberOfRatings = 20;
   }

  ngOnInit(): void {
  }


  setTShirtSize(size : number){
    this.tshirtSize = TShirtSize[TShirtSize[size]];
  }

  changeRating(newRating : number){
    this.rating = newRating;
  }

}
