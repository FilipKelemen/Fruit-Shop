import { group } from '@angular/animations';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  confirmedPasswordValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordEqualityNotPassing: boolean = control.parent?.get('password')?.value !== control.value;
      return passwordEqualityNotPassing ?  //returns the object when the validator does not pass and null when it passes(ValidationErrors has this pattern)
        {confirmedPassword: {value: control.value}} :
        null;
    };
  }
  paymentMethodPairsValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      let pairsNotMadeCorrectly: boolean = true;
      if((control.get('paymentMethod')?.value == 'card' && !control.get('cardDetails')?.valid)
          || (control.get('paymentMethod')?.value == 'bankTransfer' && control.get('bankDetails')?.valid)
          || (control.get('paymentMethod')?.value == 'cashOnDelivery' && control.get('cashOnDeliveryDetails')?.valid))
              pairsNotMadeCorrectly = false;
      return pairsNotMadeCorrectly ?
        {paymentForm: {value: control.value}} :
        null;
    }
  }

  constructor() { }
  deliveryForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    countryToBeDelivered: new FormControl('0', Validators.required),
    deliveryServiceId: new FormControl('0', Validators.required)
  }, Validators.required);
  deliveryAddressForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    phoneNumberCountry: new FormControl('0'),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/gm)]), // Romania phone number
    country: new FormControl('0',Validators.required),
    completeStreet: new FormControl('',Validators.required),
    county: new FormControl('0',Validators.required),
    city: new FormControl('0',Validators.required),
    postalCode: new FormControl(''),
    company: new FormControl('')
  }, Validators.required);
  billingAddressForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    phoneNumberCountry: new FormControl('0'),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/gm)]), // Romania phone number
    country: new FormControl('0',Validators.required),
    completeStreet: new FormControl('',Validators.required),
    county: new FormControl('0',Validators.required),
    city: new FormControl('0',Validators.required),
    postalCode: new FormControl(''),
    company: new FormControl('')
  }, Validators.required);
  paymentForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    paymentMethod: new FormControl('0', Validators.required),
    cardDetails: new FormGroup({
      $key: new FormControl(null),
      ownerName: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      ccv2: new FormControl('', Validators.required),
      expirationMonth: new FormControl('1', Validators.required),
      expirationYear: new FormControl('1', Validators.required)
    }),
    bankDetails: new FormGroup({
      $key: new FormControl(null),
      ownerName: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      ccv2: new FormControl('0', Validators.required),
      expirationMonth: new FormControl('0', Validators.required),
      expirationYear: new FormControl('0', Validators.required)
    }),
    cashOnDeliveryDetails: new FormGroup({
      $key: new FormControl(null),
      ownerName: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      ccv2: new FormControl('0', Validators.required),
      expirationMonth: new FormControl('0', Validators.required),
      expirationYear: new FormControl('0', Validators.required)
    }),
  }, [Validators.required, this.paymentMethodPairsValidator()])
  loginForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  });
  registerForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]),
    passwordConfirmation: new FormControl('',[Validators.required,this.confirmedPasswordValidator()]),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required)
  });
  
}

