import { Component, OnInit } from '@angular/core';
import { TShirt } from '../../models/tshirt.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public tshirts: TShirt[] = [
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1),
    new TShirt(1,"majica",1)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
