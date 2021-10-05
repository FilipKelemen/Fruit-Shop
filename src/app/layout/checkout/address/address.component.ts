import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries and counties/countries.service';
import {  CountriesWithFlagsDTO } from 'src/app/services/countries and counties/models';
import { FormsService } from 'src/app/services/forms/forms.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent{

  addressType = 'delivery'; //Used to send with @Input to the address-form component which form i want to modify( in this case delivery)


}
