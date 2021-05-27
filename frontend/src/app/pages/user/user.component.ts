import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable, SubscribableOrPromise, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck, OnDestroy, OnChanges {
  public user: Observable<User>;
  public userSub: Subscription;

  constructor(private authService: AuthService) { 
    this.user = authService.user;
    this.userSub = this.user.subscribe((user: User) => {
      //console.log(user);
    });
    this.authService.sendUserDataIfExists();

    setTimeout(() => {
      //this.authService.sendUserDataIfExists();
    }, 0);
  }
  ngDoCheck(): void {
    this.authService.sendUserDataIfExists();
  }

  ngOnInit(): void {
    this.authService.sendUserDataIfExists();
  }
  
  ngOnDestroy(): void {
    this.userSub ? this.userSub.unsubscribe() : null;
  }

  ngOnChanges() {
    this.authService.sendUserDataIfExists();

  }

}
