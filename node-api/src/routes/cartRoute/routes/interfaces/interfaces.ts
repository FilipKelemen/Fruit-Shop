export interface POSTAddressDTO {
  first_name: string;               last_name: string;
  email: string;                    postal_code: string;
  phone_number: string;             country: string;
  complete_street: string;          county: string;
  city: string;                     company: string;
  type: string;                     cart_id: string;
  user_id?: string
}

export interface PUTAddressDTO {
  first_name: string;               last_name: string;
  email: string;                    postal_code: string;
  phone_number: string;             country: string;
  complete_street: string;          county: string;
  city: string;                     company: string;
  type: string;                     cart_id: string;
  user_id?: string;                 address_id?: string;
}

export interface DeliveryServiceDTO {
  delivery_service_id: string;
}

export interface PaymentDTO {
  payment_method: string;
}