import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

interface Location{
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http:HttpClient) { }

  getLocation(){
    return this.http.get<Location>('http://api.ipapi.com/api/check?access_key=16d1633e53f72af286a278efd6d1c67c');
  }
}
