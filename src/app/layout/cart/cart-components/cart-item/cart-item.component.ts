import { Component, Input, OnInit } from '@angular/core';
import { CartResponseEntryDTO } from 'src/app/models/models';
import { faHeart, faTimesCircle, faPlusSquare,faMinusSquare} from '@fortawesome/free-solid-svg-icons';
import { CartFacade } from 'src/app/services/cart.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  faHeart = faHeart; faTimesCircle = faTimesCircle; faPlusSquare = faPlusSquare; faMinusSquare = faMinusSquare;

  constructor(private cartService:CartFacade) { }

  @Input() cartItem! : CartResponseEntryDTO;

  subtractOneFromQuantity(){
    if(this.cartItem.quantity>1){
      this.cartService.changeQuantityOfCart(this.cartItem.product.product_id, (this.cartItem.quantity-1));
    }
      
  }
  addOneToQuantity(){
    this.cartService.changeQuantityOfCart(this.cartItem.product.product_id, (this.cartItem.quantity+1));
  }
  removeItem(){
    this.cartService.removeFromCart(this.cartItem.product.product_id); // Sending only the id of the product
  }

}
