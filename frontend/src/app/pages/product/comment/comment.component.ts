import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  // Komentar isto treba da bude model po mom misljenju
  // user_id, comment, timestamp
  // od usera vicem sliku

  ngOnInit(): void {
  }

}
