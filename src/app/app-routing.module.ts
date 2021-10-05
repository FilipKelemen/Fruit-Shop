import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './layout/error-page/error-page.component';


const routes: Routes = [
{
  path:"",
  loadChildren: () => import('./layout/home-page/home-page.module').then(m => m.HomePageModule)
},
{
  path:"product-list",
  loadChildren: () => import('./layout/product-list/product-list.module').then(m => m.ProductListModule)
},
{
  path:"checkout",
  loadChildren: () => import('./layout/checkout/checkout.module').then(m => m.CheckoutModule)
},
{
  path:"product-detail-page/:id",
  loadChildren: () => import('./layout/product-detail-page/product-detail-page.module').then(m => m.ProductDetailPageModule)
},
{
  path:"cart",
  loadChildren: () => import('./layout/cart/cart.module').then(m => m.CartModule)
},
{
  path:"login",
  loadChildren: () => import ('./layout/login-and-register/login-and-register.module').then(m => m.LoginAndRegisterModule)
},
{
  path:"**",
  component:ErrorPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
