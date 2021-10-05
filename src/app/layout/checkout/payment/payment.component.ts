import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms/forms.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  

  paymentForm = this.formsService.paymentForm;

  constructor(private formsService: FormsService) { 
    
  }

  onSubmit() {
    console.log(this.paymentForm);
  }

  

}
