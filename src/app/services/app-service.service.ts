import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  AddressResDTO, CartRequestEntryDTO, CartResponseDTO,
          DeliveryServiceResDTO, PaymentMethodResDTO,
          ProductDTO } from '../models/models';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) { }

  //get Methods

  getAllProducts(): Observable<ProductDTO[]>{
    return this.http.get<ProductDTO[]>('/api/productsRoute');
  }
  getProductById(id:number) :Observable<ProductDTO>{
    return this.http.get<ProductDTO>('/api/productsRoute/' + id);
  }
  getCart(): Observable<CartResponseDTO> {
    return this.http.get<CartResponseDTO>('/api/cartRoute');
  }

  //Post methods

  addToCart(newCartItem: CartRequestEntryDTO): Observable<CartResponseDTO> {  
    return this.http.post<CartResponseDTO>('/api/cartRoute',newCartItem);
  }
  postBillingAddress(billingAddressForm: FormGroup): Observable<AddressResDTO> {
    return this.http.post<AddressResDTO>('/api/cartRoute/billingAddressRoute',billingAddressForm);
  }
  postDeliveryAddress(deliveryAddressForm: FormGroup): Observable<AddressResDTO> {
    return this.http.post<AddressResDTO>('/api/cartRoute/deliveryAddressRoute',deliveryAddressForm);
  }
  
  //Delete Methods

  removeFromCart(product_id: Number): Observable<CartResponseDTO>{
    return this.http.delete<CartResponseDTO>('/api/cartRoute/products/'+product_id);
  }

  //Patch methods

  changeQuantityOfCart(product_id: Number, quantity: Number): Observable<CartResponseDTO>{
    return this.http.patch<CartResponseDTO>('/api/cartRoute/products/'+product_id,{quantity});
  }
  patchDeliveryService(deliveryForm: FormGroup):Observable<DeliveryServiceResDTO> {
    return this.http.patch<DeliveryServiceResDTO>('/api/cartRoute/deliveryServiceRoute', deliveryForm);
  }
  patchPaymentMethod(paymentForm: FormGroup):Observable<PaymentMethodResDTO> {
    return this.http.patch<PaymentMethodResDTO>('/api/cartRoute/paymentRoute',paymentForm);
  }

  //Put methods

  putBillingAddress(billingAddressForm: FormGroup, addressId: string | undefined): Observable<AddressResDTO> {
    return this.http.put<AddressResDTO>('/api/cartRoute/billingAddressRoute/'+addressId, billingAddressForm);
  }
  putDeliveryAddress(deliveryAddressForm: FormGroup, addressId: string| undefined): Observable<AddressResDTO> {
    return this.http.put<AddressResDTO>('/api/cartRoute/deliveryAddressRoute/'+addressId, deliveryAddressForm);
  }
}
