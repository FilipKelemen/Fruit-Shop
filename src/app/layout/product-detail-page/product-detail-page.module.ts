import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailPageComponent } from './product-detail-page.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [ProductDetailPageComponent, ImageSliderComponent, ProductDetailsComponent, LoadingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    IvyCarouselModule,
    MatButtonModule,
    MatIconModule, 
    RouterModule.forChild([
      {
        path:'',
        component:ProductDetailPageComponent
      }
    ])
  ]
})
export class ProductDetailPageModule { }
