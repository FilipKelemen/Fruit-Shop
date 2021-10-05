import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartContainerComponent } from './cart-components/cart-container/cart-container.component';
import { CartItemComponent } from './cart-components/cart-item/cart-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CartComponent, CartContainerComponent, CartItemComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path:'',
        component: CartComponent
      }
    ])
  ]
})
export class CartModule { }
