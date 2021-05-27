import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DesignService } from './services/design.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit, AfterViewInit {
  designForm: FormGroup;

  @ViewChild('canvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public canvasSize: number = 1000;
  public context: CanvasRenderingContext2D;

  private selectedColor: string = "/assets/defaultTshirts/tshirtDefault.png";
  
  private selectedFile: File;
  private selectedImageSource;
  private doneImage: Blob;

  constructor(private design: DesignService, private auth: AuthService) {
    this.designForm = new FormGroup({
      tshirtName: new FormControl("", [Validators.required]),
      price: new FormControl("15", [Validators.required])
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

    if (this.designForm.invalid) {
      window.alert("The form is not valid!");
      return;
    }
    if (this.selectedFile == null) {
      window.alert("Must select a file!");
      return;
    }
    this.design.createTShirt(
      new File([this.doneImage], this.designForm.value.tshirtName + Date.now() + ".png", {type: 'image/png'})
      ,this.designForm.value.tshirtName,
      this.designForm.value.price
    );
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

}
