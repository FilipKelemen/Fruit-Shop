import { Component, ViewChild } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {  Observable, ReplaySubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { CartFacade } from 'src/app/services/cart.facade';
import { CartResponseDTO } from 'src/app/models/models';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  cart$: ReplaySubject<CartResponseDTO>= this.cartService.cart$;

  faShoppingCart = faShoppingCart;

  constructor(private cartService: CartFacade, private breakpointObserver: BreakpointObserver) { }

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)

  close() {
    this.sidenav.close();
  }
}
