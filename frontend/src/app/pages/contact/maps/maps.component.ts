import { Component } from '@angular/core';
import {MapsService} from './service/maps.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent {

  lat: string='';
  lng: string='';

  location: Object;

  public shops: Shop[] = [];

  constructor(private map:MapsService){}


  ngOnInit(): void {
    this.tshirtsSub = this.store.getShirts().subscribe((payload: tshirtsResponse) => {
      this.tshirts = [...payload.tshirtsAvailable];
      this.setupStore();
    });
  }


  ngOnInit(){
    this.map.getLocation().subscribe(data=>{
      console.log(data);
      this.lat=data.latitude;
      this.lng=data.longitude;
    })
  }

}
