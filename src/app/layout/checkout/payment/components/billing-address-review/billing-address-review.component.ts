import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/app/services/forms/forms.service';

@Component({
  selector: 'app-billing-address-review',
  templateUrl: './billing-address-review.component.html',
  styleUrls: ['./billing-address-review.component.scss']
})
export class BillingAddressReviewComponent{

  changingBillingAddress: boolean = false; //Used to show billing address and change it

  addressType: string = 'billing'//Used to send to the address-form component which form i want to modify

  //The 2 forms used to take the values from the delivery ro the billing address
  billingAddressForm: FormGroup = this.formsService.billingAddressForm;
  deliveryAddressForm:FormGroup = this.formsService.deliveryAddressForm;

  constructor( private formsService: FormsService) {
    this.billingAddressForm.setValue(this.deliveryAddressForm.value);
  }

  changingBillingAddressAction(){
    this.changingBillingAddress = !this.changingBillingAddress; //Showing/not showing the billing address
  }

}
