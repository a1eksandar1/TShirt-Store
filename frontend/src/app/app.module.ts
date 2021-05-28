import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { StoreComponent } from './pages/store/store.component';
import { CardComponent } from './pages/store/card/card.component';
import { FilterComponent } from './pages/store/filter/filter.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './ui/modals/login/login.component';
import { RegisterComponent } from './ui/modals/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommentComponent } from './pages/product/comment/comment.component';
import { CarouselComponent } from './pages/home/carousel/carousel.component';
import { DesignComponent } from './pages/design/design.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './ui/toast/toast.component';
import { MapsComponent } from './pages/contact/maps/maps.component';
import{AgmCoreModule} from '@agm/core';
import { LoadingComponent } from './pages/loading/loading.component';
import { OrderComponent } from './pages/user/order-item/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    StoreComponent,
    CardComponent,
    FilterComponent,
    AboutComponent,
    CartComponent,
    CartItemComponent,
    ContactComponent,
    HomeComponent,
    ProductComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    CommentComponent,
    CarouselComponent,
    DesignComponent,
    MapsComponent,
    ToastComponent,
    LoadingComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCFUz7BVzViqej2pUXC0VfzOxALiTlHHjA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
