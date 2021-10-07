import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/app/models/models';
import { ProductFacade } from 'src/app/services/product.facade';
import { map, take } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  constructor(private route:ActivatedRoute,private productService:ProductFacade) { }
  paramMapSubscription: Subscription= this.route.paramMap.subscribe(paramMap => {
    let id: number = Number(paramMap.get('id'));
    this.product$  = this.productService.products$.pipe(
      map((products) => products.find((product: ProductDTO) => product.product_id === id)!)
    )
})
  product$!: Observable<ProductDTO>;

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe()
  }
  

}
