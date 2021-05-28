import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { DesignService } from './services/design.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit, AfterViewInit {
  designForm: FormGroup;
  
  @ViewChild('file') fileInput: ElementRef;
  @ViewChild('tshirtName') tshirtNameInput: ElementRef;
  @ViewChild('price') priceInput: ElementRef;

  @ViewChild('alert') alert: ElementRef;

  @ViewChild('canvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public canvasSize: number = 1000;
  public context: CanvasRenderingContext2D;

  private selectedColor: string = "/assets/defaultTshirts/tshirtDefault.png";
  
  private selectedFile: File;
  private selectedImageSource;
  private doneImage: Blob;

  constructor(
    private design: DesignService, 
    private auth: AuthService, 
    private toast: ToastService, 
    private router: Router,
    private http: HttpClient
    ) {
    this.designForm = new FormGroup({
      tshirtName: new FormControl("", [Validators.required, Validators.minLength(4)]),
      price: new FormControl(15, [Validators.required,Validators.min(10)])
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  selectFiles(event: Event): void {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.selectedImageSource = e.target.result;
      this.startCanvas();
    }
    reader.readAsDataURL(this.selectedFile);
    this.fileHasErrors();
  }

  startCanvas(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    let shirtImg = new Image();
    shirtImg.src = this.selectedColor;
    shirtImg.onload = () => {
      this.myCanvas.nativeElement.width = this.canvasSize;
      this.myCanvas.nativeElement.height = this.canvasSize;
      this.context.drawImage(shirtImg,0,0,this.canvasSize,this.canvasSize);
      if(typeof this.selectedImageSource == "undefined") {
        return;
      }
      let customImg = new Image();
      customImg.crossOrigin = "anonymous";
      customImg.src = this.selectedImageSource;
      customImg.onload = () => {
        let x = this.canvasSize*0.28;
        let y = this.canvasSize*0.20;
        let dx = this.canvasSize*0.42;
        let dy = this.canvasSize*0.7;
        let ratio = customImg.width/dx;
        let h = customImg.height/ratio;
        this.context.drawImage(customImg,x,y,dx,h);

        this.myCanvas.nativeElement.toBlob((blob) => {
          this.doneImage = blob;
        });
      }
    }
  }

  createTShirt() {
    (this.alert.nativeElement as HTMLDivElement).hidden = true;
    if(this.fileHasErrors()) {
      return;
    }
    if (this.designForm.invalid) {
      this.checkErrors("tshirtName",this.tshirtNameInput);
      this.checkErrors("price",this.priceInput);
      return;
    }
    let req = this.design.createTShirt(
      new File([this.doneImage], this.designForm.value.tshirtName + Date.now() + ".png", {type: 'image/png'})
      ,this.designForm.value.tshirtName,
      this.designForm.value.price
    )
    this.http.request<Object>(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status == 409) {
          //console.log("GRESKA");
          this.toast.errorToast("GRESKA: A shirt with this name already exists!");
          (this.alert.nativeElement as HTMLDivElement).hidden = false;
          (this.alert.nativeElement as HTMLDivElement).innerText = "A shirt with this name already exists!";
        }
        return of({response: error});
      }),
      map((response: HttpResponse<Object>) => {
        //console.log("subscribed");
        // console.warn("response from", req)
        //console.log("Response: ",response);
        // console.log(response.body);
        if(response.status == 201)
        {
          let id = response.body["addedTshirt"]["_id"];
          //this.cart.addProductToCart(id,1,1);
          //console.log(id);        
          this.router.navigateByUrl("/product/" + id);
          return;
        } 
      })
    ).subscribe();
  }

  loggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  pickColor(event: Event) {
    this.selectedColor = (event.target as HTMLImageElement).src;
    this.startCanvas();
  }
  
  fileHasErrors(): boolean {
    if (this.selectedFile == null) {
      (this.fileInput.nativeElement  as HTMLInputElement).classList.add("is-invalid");
      return true;
    } else {
      (this.fileInput.nativeElement  as HTMLInputElement).classList.remove("is-invalid");
      return false;
    }
  }

  checkErrors(fieldName: string, fieldRef: ElementRef): string {
    let errors: ValidationErrors = this.designForm.errors;
    if(fieldName != "") {
      errors = this.designForm.get(fieldName).errors;
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
