import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailPageComponent } from './product-detail-page.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component'


@NgModule({
  declarations: [ProductDetailPageComponent, ImageSliderComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path:'',
        component:ProductDetailPageComponent
      }
    ])
  ]
})
export class ProductDetailPageModule { }
