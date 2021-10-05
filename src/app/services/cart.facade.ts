import { Injectable } from "@angular/core";
import {  forkJoin, iif, ReplaySubject } from "rxjs";
import { switchMap, take } from 'rxjs/operators';
import {  CartRequestEntryDTO, CartResponseDTO } from "../models/models";
import { FormGroup } from "@angular/forms";
import { AppServiceService } from "./app-service.service";
import { MatStepper } from "@angular/material/stepper";
import { SnackBarService } from "./snack_bar/snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class CartFacade{
  cart$: ReplaySubject<CartResponseDTO> = new ReplaySubject(1);

  constructor(private appService: AppServiceService, private snackBar: SnackBarService) {
    this.appService.getCart().subscribe((cart : CartResponseDTO) => {
      console.log(cart);
      this.cart$.next(cart)
    });
  }

  addToCart(cartItem: CartRequestEntryDTO) {
     this.appService.addToCart(cartItem).subscribe((cart  : CartResponseDTO) =>this.cart$.next(cart));
  }

  removeFromCart(product_id: number){
    this.appService.removeFromCart(product_id).subscribe(
      (cart: CartResponseDTO) => {
        this.cart$.next(cart)
        this.snackBar.openSnackBar('Item removed From cart','Close')
      });
  }

  changeQuantityOfCart(product_id: number, quantity:number){
    this.appService.changeQuantityOfCart(product_id,quantity).subscribe((cart: CartResponseDTO) => this.cart$.next(cart));
  }

  //The Checkout Form is handled below:

  submitCheckoutForm(deliveryForm: FormGroup, deliveryAddressForm: FormGroup,
                    paymentForm:FormGroup, billingAddressForm: FormGroup,
                    myStepper: MatStepper) {
    
    forkJoin({
      deliveryServiceReq: this.appService.patchDeliveryService(deliveryForm),
      deliveryAddressReq: this.cart$.pipe(
        switchMap((cart: CartResponseDTO) => 
          //The if else statement
        iif(() => (cart.addresses.length === 0 || !cart.addresses.some(address => address.type==='delivery')),
          this.appService.postDeliveryAddress(deliveryAddressForm),
          this.appService.putDeliveryAddress(deliveryAddressForm,
                            cart.addresses.find(address => address.type==='delivery')?.address_id) //This way i send the address_id if there is aleradt a delivery address
        )
        ),
        take(1)
      ),
      paymentMethodReq: this.appService.patchPaymentMethod(paymentForm),  
      billingAddressReq: this.cart$.pipe(
          switchMap((cart: CartResponseDTO) => 
          //The if else statement
          iif(() => (cart.addresses.length === 0 || !cart.addresses.some(address => address.type==='billing')), 
            this.appService.postBillingAddress(billingAddressForm),
            this.appService.putBillingAddress(billingAddressForm, 
                              cart.addresses.find(address => address.type==='billing')?.address_id)
            )
          ),
          take(1)   
          ),
    }).subscribe(({deliveryServiceReq, deliveryAddressReq, paymentMethodReq, billingAddressReq}) => {
      console.log(deliveryServiceReq,deliveryAddressReq,paymentMethodReq,billingAddressReq);
      //I update the cart with the form that was just completed
      this.cart$.pipe(
        take(1)
        ).subscribe((cart: CartResponseDTO) =>{
           cart.addresses.length=0; //emptying the array
           cart.addresses.push( deliveryAddressReq.deliveryAddress!);
           cart.addresses.push( billingAddressReq.billingAddress!)
           cart.delivery_service = deliveryServiceReq.deliveryServiceFromDB;
           cart.delivery_service_id = deliveryServiceReq.deliveryServiceFromDB.delivery_service_id;
           cart.payment_method = paymentMethodReq.paymentObject.payment_method;
          console.log(cart); 
          this.cart$.next(cart);
          //Redirecting when the cart was updated succesfuly
          myStepper.selectedIndex = 3
        },
          (err) => console.log(err)
        )
    })
  }

  patchDeliveryService(deliveryForm: FormGroup) {
    this.appService.patchDeliveryService(deliveryForm).subscribe(console.log);
  }

  //--cart--|
  //--cart--if(cart.address===null or there is no  billing address yet)--postBillingAddressResponse |
          //else                                                        --putBillingAddressResponse |
  handleBillingAddress(billingAddressForm: FormGroup) {
    this.cart$.pipe(
      switchMap((cart: CartResponseDTO) => 
        //The if else statement
        iif(() => (cart.addresses.length === 0 || !cart.addresses.some(address => address.type==='billing')), 
          this.appService.postBillingAddress(billingAddressForm),
          this.appService.putBillingAddress(billingAddressForm, 
                            cart.addresses.find(address => address.type==='billing')?.address_id)
        )
      ),
      take(1)   
    ).subscribe(console.log)
  }

  //--cart--|
  //--cart--if(cart.address===null or there is no  delivery address yet)--postDeliveryAddressResponse|
          //else                                                        --putDeliveryAddressResponse |
  handleDeliveryAddress(deliveryAddressForm: FormGroup) {
    this.cart$.pipe(
      switchMap((cart: CartResponseDTO) => 
        //The if else statement
        iif(() => (cart.addresses.length === 0 || !cart.addresses.some(address => address.type==='delivery')),
          this.appService.postDeliveryAddress(deliveryAddressForm),
          this.appService.putDeliveryAddress(deliveryAddressForm,
                            cart.addresses.find(address => address.type==='delivery')?.address_id) //This way i send the address_id if there is aleradt a delivery address
        )
      ),
      take(1)
    ).subscribe(console.log)
  }

  //testing
  testCart() {
    this.cart$.pipe(
      take(1)
    ).subscribe( (cart : CartResponseDTO)=> console.log(cart.addresses.some(address => address.type==='delivery')));
  }
}
