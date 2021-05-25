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
    ContactComponent,
    HomeComponent,
    ProductComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    CommentComponent,
    CarouselComponent,
    DesignComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
