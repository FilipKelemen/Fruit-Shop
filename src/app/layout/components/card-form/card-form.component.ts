import { Component } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FormsService } from 'src/app/services/forms/forms.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent {

  months = Array(12).fill(0).map((x,i)=>i+1);
  
  currentYear: number = new Date().getFullYear();
  years = Array(20).fill(0).map((x,i)=> this.currentYear + i);

  paymentForm = this.formsService.paymentForm;
  cardDetails = this.formsService.paymentForm.get('cardDetails')

  constructor(private formsService: FormsService, private rootFormGroup: FormGroupDirective) {
   }


}
