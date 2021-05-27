import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/common/jwt.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
