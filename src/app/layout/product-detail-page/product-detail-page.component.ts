import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/app/models/models';
import { ProductFacade } from 'src/app/services/product.facade';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  paramMapSubscription!: Subscription;
  constructor(private route:ActivatedRoute,private productService:ProductFacade) { }
  productTargeted!: ProductDTO;

  ngOnInit(): void {
    this.paramMapSubscription =
    this.route.paramMap.subscribe(paramMap => {
      let id: number = Number(paramMap.get('id'));
      this.productService.products$.pipe(
        take(1)
      ).subscribe(
        (products) => {
        this.productTargeted=products.find((product: ProductDTO) => product.product_id === id)!;
      }, (error) => {
        console.log('Error is '+JSON.stringify(error));
      });
  })
  }
  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe()
  }
  

}
