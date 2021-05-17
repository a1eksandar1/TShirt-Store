import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef
  loginForm: FormGroup;
  loginSub: Subscription;

  constructor(private authService: AuthService) { 
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });

  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.loginSub ? this.loginSub.unsubscribe() : null;
  }

  public login(): void {
    if (this.loginForm.invalid) {
      window.alert("The form is not valid!");
      return;
    }

    const formData = this.loginForm.value;

    this.loginSub = this.authService.loginUser(formData.email, formData.password).subscribe();

    this.closeModal.nativeElement.click() 
  }


}
