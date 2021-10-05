import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/title_and_presentation_image/title/title.component';
import { PresentationImageComponent } from './components/title_and_presentation_image/presentation-image/presentation-image.component';
import { FirstStickyImageSliderComponent } from './components/first-sticky-image-slider/first-sticky-image-slider.component';



@NgModule({
  declarations: [HomePageComponent, TitleComponent, PresentationImageComponent, FirstStickyImageSliderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:HomePageComponent
      }
    ])
  ]
})
export class HomePageModule { }
