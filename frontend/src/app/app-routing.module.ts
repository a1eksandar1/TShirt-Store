import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DesignComponent } from './pages/design/design.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { ProductComponent } from './pages/product/product.component';
import { StoreComponent } from './pages/store/store.component';
import { UserAuthenticatedGuard } from './pages/user/guards/user-authenticated.guard';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'store', component: StoreComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'cart', component: CartComponent, canActivate: [UserAuthenticatedGuard]},
  { path: 'user', component: UserComponent, canActivate: [UserAuthenticatedGuard]},
  { path: 'product/:_id', component: ProductComponent},
  { path: 'design', component: DesignComponent},
  { path: 'loading', component: LoadingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
