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

  constructor() { }

  ngOnInit(): void {
  }

}
