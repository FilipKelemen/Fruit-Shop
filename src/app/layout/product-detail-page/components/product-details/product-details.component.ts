import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { PriceDTO } from 'src/app/models/models';
import { CartFacade } from 'src/app/services/cart.facade';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  @Input() productName!: string;
  @Input() productDescription!: string;
  @Input() product_id!: number;
  @Input() productPrice!: PriceDTO;

  constructor(private cartService : CartFacade) { }

  addToCart() {
    this.cartService.addToCart({product_id: this.product_id, quantity: 1});
  }
}
