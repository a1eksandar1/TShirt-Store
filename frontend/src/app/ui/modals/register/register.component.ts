import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordMatchValidator } from './validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef;
  registerForm: FormGroup;
  registerSub: Subscription;

  @ViewChild('emailReg') emailInput: ElementRef;
  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('passwordReg') passwordInput: ElementRef;
  @ViewChild('password2') password2Input: ElementRef;

  @ViewChild('alert') alert: ElementRef;

  constructor(private authService: AuthService) { 
    this.registerForm = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      username: new FormControl("",[Validators.required, Validators.minLength(4)]),
      password: new FormControl("",[Validators.required, Validators.minLength(4)]),
      password2: new FormControl("",[Validators.required])
    },[PasswordMatchValidator]);
  }
  
  public ngOnDestroy(): void {
    this.registerSub ? this.registerSub.unsubscribe() : null;
  }

  ngOnInit(): void {
  }

  public register(): void {
    (this.alert.nativeElement as HTMLDivElement).hidden = true;

    if(this.registerForm.invalid) {
      this.checkErrors("username",this.usernameInput);
      this.checkErrors("email",this.emailInput);
      this.checkErrors("password",this.passwordInput);
      this.checkErrors("password2",this.password2Input);
      this.checkErrors("", this.password2Input);
      return;
    }

    const formData = this.registerForm.value;

    this.registerSub = this.authService.registerUser(formData.username, formData.password, formData.email).subscribe((value: string) => {
      console.log(value);
      if(value == "User created") {
        this.registerForm.reset();
        this.closeModal.nativeElement.click();
      } else {
        (this.alert.nativeElement as HTMLDivElement).hidden = false;
        (this.alert.nativeElement as HTMLDivElement).innerText = value;
      }
    });

  }
  
  checkErrors(fieldName: string, fieldRef: ElementRef): string {
    let errors: ValidationErrors = this.registerForm.errors;
    if(fieldName != "") {
      errors = this.registerForm.get(fieldName).errors;
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
