import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBar') searchBar: ElementRef;
  public isLoggedIn: boolean = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private searchService: SearchService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userSub = this.authService.user.subscribe((user: User) => {
      if(user==null) {
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
    });

    router.events.subscribe((value) => {
      if(value instanceof NavigationStart && value.url != "/store" && value.url != "/loading") {
        console.log(value);
        this.searchService.search("");
        this.searchBar.nativeElement.value = "";
      }
    })
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

  search(): void {
    const value: string = this.searchBar.nativeElement.value;
    console.log("searching: ", value);
    this.searchService.search(value);
    this.router.navigateByUrl('/loading', {skipLocationChange: true}).then(()=>
    this.router.navigateByUrl("/store"));
  }
}
