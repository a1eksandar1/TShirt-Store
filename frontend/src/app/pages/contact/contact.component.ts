import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/models/shop.model';
import { MapsService } from './maps/service/maps.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public shops: Observable<Shop[]>;


  constructor(private map:MapsService) {
    this.shops=this.map.shops;
  }

  ngOnInit(): void {
  }

}
