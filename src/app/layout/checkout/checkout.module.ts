import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { CheckoutNavbarComponent } from 'src/app/layout/checkout/stepper/checkout-navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper'
import { MatIconModule } from '@angular/material/icon'
import { CountrySelectionItemComponent } from './address/components/country-selection-item/country-selection-item.component'
import { AddressFormComponent } from './address/components/address-form/address-form.component';
import { CardFormComponent } from '../components/card-form/card-form.component';
import { BillingAddressReviewComponent } from './payment/components/billing-address-review/billing-address-review.component';


@NgModule({
  declarations: [CheckoutComponent,CheckoutNavbarComponent,DeliveryComponent,
                 PaymentComponent,AddressComponent,ReviewComponent, CountrySelectionItemComponent
                 ,CheckoutNavbarComponent,AddressFormComponent, CardFormComponent,
                  BillingAddressReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatStepperModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path:'',
        component:CheckoutComponent,
      }  
      //   children:[{
      //     path:'',
      //     pathMatch: 'full',
      //     redirectTo:'delivery'
      //   },{
      //     path:'delivery',
      //     component: DeliveryComponent,
      //   },
      //   {
      //     path:'address',
      //     component: AddressComponent,
      //   },
      //   {
      //     path:'payment',
      //     component:PaymentComponent,
      //   },
      //   {
      //     path:'review',
      //     component:ReviewComponent,
      //   }]
      // },
    ]),
    MatButtonModule,
  ]
})
export class CheckoutModule { }
