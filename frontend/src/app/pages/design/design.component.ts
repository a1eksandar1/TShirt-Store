import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public canvasSize: number = 1000;
  public context: CanvasRenderingContext2D;

  private selectedImageSource;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  selectFiles(event: Event): void {
    let selectedFile: File = (event.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.selectedImageSource = e.target.result;
      this.startCanvas();
    }
    reader.readAsDataURL(selectedFile);
  }

  startCanvas(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    let shirtImg = new Image();
    shirtImg.src = "http://localhost:3000/assets/images/tshirtDefault.png";
    shirtImg.onload = () => {
      this.myCanvas.nativeElement.width = this.canvasSize;
      this.myCanvas.nativeElement.height = this.canvasSize;
      this.context.drawImage(shirtImg,0,0,this.canvasSize,this.canvasSize);
      let customImg = new Image();
      customImg.src = this.selectedImageSource;
      customImg.onload = () => {
        let x = this.canvasSize*0.28;
        let y = this.canvasSize*0.20;
        let dx = this.canvasSize*0.42;
        let dy = this.canvasSize*0.7;
        let ratio = customImg.width/dx;
        let h = customImg.height/ratio;
        this.context.drawImage(customImg,x,y,dx,h);
      }
    }
  }
}
