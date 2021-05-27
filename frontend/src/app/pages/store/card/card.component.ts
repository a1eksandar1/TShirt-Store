import { Component, Input, OnInit } from '@angular/core';
import { TShirt } from '../../../models/tshirt.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  tshirt: TShirt;

  private readonly urls = {
    backend: "http://localhost:3000/"
  }

  constructor() { }

  ngOnInit(): void {
  }

  getImageSrc(): string {
    //console.log(this.urls.backend + this.tshirt.image);
    return this.urls.backend + this.tshirt.image;
  }

}
