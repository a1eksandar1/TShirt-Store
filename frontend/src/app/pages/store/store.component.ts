import { Component, OnInit } from '@angular/core';
import { TShirt } from '../../models/tshirt.model';
import { SortBy } from './models/store.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  makeid(length) :string {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }

  public tshirts: TShirt[] = [];

  public tshirtsAlphAtZ: TShirt[];
  public tshirtsPriceLtH: TShirt[];
  public tshirtsPriceHtL: TShirt[];

  private _sortBy: SortBy = SortBy.NameAtZ;
  public get sortBy() :SortBy {
    return this._sortBy;
  }
  public set sortBy(by: SortBy) {
    this._sortBy=by;
    switch (this.sortBy) {
      case SortBy.NameAtZ:
        this.tshirts = this.tshirtsAlphAtZ;
        break;
      case SortBy.PriceHtL:
        this.tshirts = this.tshirtsPriceHtL;
        break;
      case SortBy.PriceLtH:
        this.tshirts = this.tshirtsPriceLtH;
        break;
      default:
        break;
    }
    this.tshirts = this.tshirts.slice((this.page-1)*this.showPerPage, this.page * this.showPerPage);
  }

  private _showPerPage: number = 12;
  public get showPerPage(): number {
    return this._showPerPage;
  }
  public set showPerPage(value: number){
    if(value != this._showPerPage)
      this.page = 1;
    this._showPerPage = value;
    this.sortBy = this.sortBy;
  }

  public _page: number = 1;
  public get page(): number {
    return this._page;
  }
  public set page(value: number) {
    console.log(value);
    this._page = value;
    this.sortBy = this.sortBy;
  }

  constructor() { }

  ngOnInit(): void {

    for (let i = 0; i < 100; i++) {
      this.tshirts.push(new TShirt(i,this.makeid(10),Math.round(Math.random()*100)));
    }

    this.tshirtsAlphAtZ = [...this.tshirts];
    this.tshirtsAlphAtZ.sort((a: TShirt, b: TShirt) => {
      let nameA: string = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB: string = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    this.tshirtsPriceLtH = [...this.tshirts];
    this.tshirtsPriceLtH.sort((a: TShirt, b: TShirt) => {
      return a.price - b.price;
    });
    this.tshirtsPriceHtL = [...this.tshirts];
    this.tshirtsPriceHtL.sort((a: TShirt, b: TShirt) => {
      return b.price - a.price;
    });

    this.tshirts = this.tshirtsAlphAtZ;
    this.showPerPage = this.showPerPage;
  }

}
