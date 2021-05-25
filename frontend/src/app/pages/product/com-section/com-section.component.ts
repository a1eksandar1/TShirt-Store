import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-com-section',
  templateUrl: './com-section.component.html',
  styleUrls: ['./com-section.component.css']
})
export class ComSectionComponent implements OnInit {

  // @Input()
  // public comments: string[];

  public comments: string[] = ["jebo te fata", "sipu rac", "treci komentar"];

  constructor() {
    console.log(this.comments.length);
    console.log(this.comments);
  }

  ngOnInit(): void {
  }

  // addComent(who, text){
  //   var control = "";

  //   if (who % 2 == 0){
  //       control = '<li style="width:100%">' +
  //                       '<div class="msj macro">' +
  //                           '<div class="text text-l">' +
  //                             '<p>'+ text +'</p>' +
  //                           '</div>' +
  //                       '</div>' +
  //                   '</li>';
  //   }else{
  //       control = '<li style="width:100%;">' +
  //                       '<div class="msj-rta macro">' +
  //                           '<div class="text text-r">' +
  //                             '<p>'+text+'</p>' +
  //                           '</div>' +
  //                       '<div class="avatar" style="padding:0px 0px 0px 10px !important"></div>' +
  //                 '</li>';
  //   }
  //   // ovde nema JQuery pa ovo neradi ali mi treba da dinamicki dodajem li u angularu
  //   // $("ul").append(control);
      // dodaj u listu komentara?
  // };

}
