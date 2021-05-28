import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shop } from 'src/app/models/shop.model';
import {MapsService} from './service/maps.service';
import { shopsResponse } from './service/models/shopsResponse.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnDestroy {
  private shopSub: Subscription;

  public lat: number = 44.806;
  public lng: number = 20.460;
  public zoom: number = 13;

  location: Object;

  public shops: Shop[] = [];

  constructor(private map: MapsService){}

  ngOnInit(): void {
    this.shopSub = this.map.getShops().subscribe((payload: shopsResponse) => {
      this.shops = payload.shopsAvailable;
      //this.lat = this.shops[0].lat;
      //this.lng = this.shops[0].lng;
      console.log(this.lat,this.lng);
      console.log(this.shops);
    });
  }

  ngOnDestroy() {
    this.shopSub.unsubscribe();
  }

}
