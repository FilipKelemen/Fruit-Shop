import { Component, OnInit } from '@angular/core';
import { CartFacade } from 'src/app/services/cart.facade';
import { faLemon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-container',
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss']
})
export class CartContainerComponent implements OnInit {

  addedClass: boolean = false;

  constructor(private cartService: CartFacade) { }

  faLemon = faLemon;
  
  cart$ = this.cartService.cart$; 

  ngOnInit(): void {
  
  }

}
