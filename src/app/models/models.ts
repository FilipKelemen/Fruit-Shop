
export interface ProductDTO {
  product_id: number;
  number_in_stock: number;
  colors: string[];
  name: string;
  image:string;
  price: PriceDTO;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// What I receive from DB--------------->

export interface CartResponseDTO {
  cart_id: string;
  cart_entries: CartResponseEntryDTO[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
  formatted_total: string;
  delivery_service_id: string;
  delivery_service: {
    delivery_service_id: string;
    name: string;
  };
  payment_method: string;
  addresses: AddressDTO[] ;
};

export interface CartResponseEntryDTO {
  cart_entry_id: string;
  cart_id: string;
  product_id: number;
  product:ProductDTO;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  delivery_service: string;
  payment_method: string;
};


export interface AddressDTO {
  $key: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumberCountry: string | null;
  phoneNumber: string;
  country: string;
  completeStreet: string;
  county: string;
  city: string;
  postalCode: string;
  company: string;
  type?: string;
  address_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface AddressResDTO {
  succes: boolean;
  msg: string;
  deliveryAddress?: AddressDTO;
  billingAddress?: AddressDTO;
}

export interface DeliveryServiceReqDTO {
  $key: string | null;
  countryToBeDelivered: string;
  deliveryService: string;
}
export interface DeliveryServiceResDTO {
  succes: boolean;
  msg: string;
  deliveryServiceFromDB: {
    createdAt: Date;
    updatedAt: Date;
    delivery_service_id: string;
    name: string;
  }
}

export interface PaymentMethodReqDTO {
  $key: string | null;

}
export interface PaymentMethodResDTO {
  succes: boolean;
  msg: string;
  paymentObject: {
    payment_method: string;
  }
}
// what i send to DB---------------->

export interface CartRequestDTO { // I dont't think i'll ever use it, because I send items one by one
  entries: CartRequestEntryDTO[];
};

export interface CartRequestEntryDTO {
  product_id: number;
  quantity: number;
};

// <------------What i send to DB

// <-------------------
export interface PriceDTO {
  value: number;
  currency: string;
  formattedPrice: string;
};

export interface RegisterUserDTO {
  $key: string | null;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
};

export interface RegisterResponse {
  succes: boolean;
  user: {
    createdAt: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    updatedAt: string;
    user_id: string;
  };
  token: string;
  expiresIn: string;
};

export interface LoginUserDTO {
  $key: string | null;
  email: string;
  password:string;
};