import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TShirt } from 'src/app/models/tshirt.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/ui/toast/service/toast.service';
import { ProductService } from './services/product.service';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product : Observable<{tshirt : TShirt}>;
  public tshirt : TShirt;

  private productId : string;
  private size : number;
  private commentTextArea : string = " ";

  constructor(
    private productService : ProductService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
    public toastService: ToastService,
  ) {
    this.product = this.activatedRoute.paramMap.pipe(
      switchMap((params : ParamMap) => {
        this.productId = params.get('_id');
        return this.productService.getProductById(this.productId);
      })
    )
    this.product.subscribe((val) => {
      this.tshirt = val.tshirt;
    });
  }

  ngOnInit(): void {
  }

  changeRating(userRating : number){
    if(!this.authService.isLoggedIn()){
      this.toastService.errorToast('You must be logged in to leave a rating.');
      return;
    }
    const obs = this.productService.rateProduct(userRating, this.productId);

    obs.subscribe(
      (val)=>{
        this.tshirt.numberOfRatings++;
        this.tshirt.ratingSum += userRating;
        this.toastService.successToast('Your rating has been submitted!');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newComment(tshirtName: string, comment: string){
    if(comment.trim().length == 0){
      return;
    }
    if(!this.authService.isLoggedIn()){
      this.toastService.errorToast('You must be logged in to comment');
      return;
    }
    const obs = this.productService.postComment(tshirtName, comment);
    obs.subscribe(
      (val)=>{
        this.tshirt.comments.push(comment);
        this.toastService.successToast('Posted!');
        this.commentTextArea = " ";
      },
      (error) => {console.log(error);}
    );
  }

  setTShirtSize(size : number){
    this.size = size;
  }

}
