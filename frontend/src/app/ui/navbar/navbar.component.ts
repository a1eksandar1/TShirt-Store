import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userSub = this.authService.user.subscribe((user: User) => {
      if(user==null) {
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userSub ? this.userSub.unsubscribe() : null;
  }

  logout(): void {
    this.authService.logoutUser();
    this.router.navigateByUrl("/");
  }

}
