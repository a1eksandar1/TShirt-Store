import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef
  registerForm: FormGroup;
  registerSub: Subscription;

  constructor(private authService: AuthService) { 
    this.registerForm = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      password2: new FormControl("",[Validators.required])
    });
  }
  
  public ngOnDestroy(): void {
    this.registerSub ? this.registerSub.unsubscribe() : null;
  }

  ngOnInit(): void {
  }

  public register(): void {
    if(this.registerForm.invalid) {
      window.alert("The form is not valid!");
      return;
    }

    const formData = this.registerForm.value;

    this.registerSub = this.authService.registerUser(formData.username, formData.password, formData.email).subscribe();

    this.closeModal.nativeElement.click();
  }

}
