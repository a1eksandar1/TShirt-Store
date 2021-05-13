import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortBy } from '../models/store.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() sortBy: SortBy;
  @Output() sortByChange: EventEmitter<SortBy> = new EventEmitter<SortBy>();

  @Input() showPerPage: number;
  @Output() showPerPageChange: EventEmitter<number> = new EventEmitter<number>();
  
  @Input() page: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onChangeSort(event: Event): void {
    const by: SortBy = (event.target as HTMLSelectElement).value as SortBy;
    this.sortByChange.emit(by);
  }

  onChangeShowPerPage(event: Event): void {
    const value: number = parseInt((event.target as HTMLInputElement).value);
    this.showPerPageChange.emit(value);
  }
  
  onChangePageUp(): void {
    this.pageChange.emit(this.page + 1);
  }
  
  onChangePageDown(): void {
    if(this.page <= 1) 
      return;
    this.pageChange.emit(this.page - 1);
  }

}
