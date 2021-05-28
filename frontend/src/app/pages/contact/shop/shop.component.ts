import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/models/shop.model';
import { MapsService } from '../maps/service/maps.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  @Input()
  shop: Shop;

   constructor() {

   }


  ngOnInit(): void {
  }

}
