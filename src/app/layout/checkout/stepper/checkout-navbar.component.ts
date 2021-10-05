import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CartFacade } from 'src/app/services/cart.facade';
import { FormsService } from 'src/app/services/forms/forms.service';

@Component({
  selector: 'app-checkout-navbar',
  templateUrl: './checkout-navbar.component.html',
  styleUrls: ['./checkout-navbar.component.scss']
})
export class CheckoutNavbarComponent {

  @ViewChild('stepper') private myStepper!: MatStepper;

  constructor(private formsService: FormsService, private cartFacade: CartFacade) { }

  deliveryForm: FormGroup = this.formsService.deliveryForm;
  deliveryAddressForm: FormGroup = this.formsService.deliveryAddressForm;
  paymentForm: FormGroup = this.formsService.paymentForm;
  billingAddressForm: FormGroup = this.formsService.billingAddressForm;

  //I send all the forms once


  submitAllForms(){
    // this.cartFacade.handleDeliveryAddress(this.deliveryAddressForm.value);  
    // this.cartFacade.handleBillingAddress(this.billingAddressForm.value);
    // this.cartFacade.patchDeliveryService(this.deliveryForm.value);
    this.cartFacade.
      submitCheckoutForm(this.deliveryForm.value,
                        this.deliveryAddressForm.value,
                        this.paymentForm.value,
                        this.billingAddressForm.value,
                        this.myStepper);
    // this.cartFacade.testCart();
  }

}
