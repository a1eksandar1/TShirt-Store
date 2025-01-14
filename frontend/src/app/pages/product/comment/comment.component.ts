import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  public commentText: string;

  @Input()
  public alignRight: boolean;


  constructor() {
  }

  ngOnInit(): void {
  }

}
