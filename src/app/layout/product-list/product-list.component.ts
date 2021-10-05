import { Component } from '@angular/core';
import { faHeart, faEye, faShoppingCart,faStar } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject } from 'rxjs';
import { fade } from 'src/app/animations/animations';
import { ProductDTO } from 'src/app/models/models';
import { CartFacade } from 'src/app/services/cart.facade';
import { ProductFacade } from 'src/app/services/product.facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    fade
  ]
})
export class ProductListComponent {

  faHeart = faHeart; faShoppingCart = faShoppingCart; faEye = faEye; faStar = faStar;
  
  products$: ReplaySubject<ProductDTO[]> = this.productService.products$; //getting the subject from the product facade where it is onInit triggered by get all products so in theory it should display every product
  
  constructor(private productService: ProductFacade,private cartService: CartFacade) {}

  onCartButton(product : ProductDTO)  {
    this.cartService.addToCart(
      {
        product_id:product.product_id,
        quantity: 1,
      }
    );
  }

}
