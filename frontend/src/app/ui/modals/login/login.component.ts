import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef;
  loginForm: FormGroup;
  loginSub: Subscription;
  
  @ViewChild('email') emailInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;

  @ViewChild('alert') alert: ElementRef;

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
    (this.alert.nativeElement as HTMLDivElement).hidden = true;
    
    if (this.loginForm.invalid) {
      this.checkErrors("email",this.emailInput);
      this.checkErrors("password",this.passwordInput);
      return;
    }

    const formData = this.loginForm.value;

    this.loginSub = this.authService.loginUser(formData.email, formData.password).subscribe((value: User) => {
      console.log(value);
      if(value != null) {
        this.closeModal.nativeElement.click();
      } else {
        (this.alert.nativeElement as HTMLDivElement).hidden = false;
        (this.alert.nativeElement as HTMLDivElement).innerText = "E-mail or password incorrect!";
      }
    });
  }

  checkErrors(fieldName: string, fieldRef: ElementRef): string {
    let errors: ValidationErrors = this.loginForm.errors;
    if(fieldName != "") {
      errors = this.loginForm.get(fieldName).errors;
    }
    const hasError: boolean = (errors != null);
    if(hasError) {
      (fieldRef.nativeElement  as HTMLInputElement).classList.add("is-invalid");
    } else {
      (fieldRef.nativeElement  as HTMLInputElement).classList.remove("is-invalid");
    }
    return hasError ? "is-invalid" : "";
  }

}
