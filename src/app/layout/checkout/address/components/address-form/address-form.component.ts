import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries and counties/countries.service';
import { CountriesWithFlagsDTO } from 'src/app/services/countries and counties/models';
import { FormsService } from 'src/app/services/forms/forms.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  //Each time you use this component you should pass in the type of address you want the form to be----- Example: 'delivery', 'billing'

  @Input()
  addressFormType!: string ;

  nameOfAddressForm!: string; //used together with a string from @Input to create the name of the deliveryAddress

  deliveryAddressForm : FormGroup = this.formsService.deliveryAddressForm;

  addressForm!: FormGroup;

  countries$!: Observable<CountriesWithFlagsDTO>; 

  breakpoint!: number; errorText!: string; needRequestCountry: boolean = true;

  constructor(private formsService : FormsService, private countriesService : CountriesService) {
    
   }

  ngOnInit() {
    if(window.innerWidth<=768){   //changing the grid when the screen is smaller and changing the error text so it fits
      this.breakpoint = 1;
      this.errorText = 'Required'
    } else {
      this.breakpoint = 2;
      this.errorText = 'This field is required'
    }
    //Designating the type of the form this component will use
    this.addressForm = this.formsService[this.addressFormType+'AddressForm'] 
    console.log(this.addressForm);
  }
  
  onResize(event : any) {
    if(event.target.innerWidth <= 768){   //changing the grid when the screen is smaller and changing the error text so it fits
      this.breakpoint = 1;
      this.errorText = 'Required'
    } else {
      this.breakpoint = 2;
      this.errorText = 'This field is required'
    }
  }

  getAllCountriesWithFlags() { //Only getting the data from the db once
    if(this.needRequestCountry){
      this.countries$ = this.countriesService.getAllCountries();
      this.needRequestCountry = false;
    }
  }


}
