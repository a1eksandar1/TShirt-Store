import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public keyword: string;

  constructor() {
    this.keyword = "";
  }

  search(keyword: string) {
    this.keyword = keyword;
  }
}
