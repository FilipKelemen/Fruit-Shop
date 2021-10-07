import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  @Input()  imageLink!:string;

  constructor(private breakpointObserver: BreakpointObserver) { }

  images!:Array<{path: string}>; numberOfImagesShown!: Observable<number>;

  ngOnInit(): void {
    //The external module works with this format
    this.numberOfImagesShown = this.breakpointObserver.observe('(min-width: 768px)')
      .pipe(map(({matches}) => matches ? 1.5 : 1));
    this.images = [
      {path: this.imageLink},
      {path: 'assets/Images/bananas.jpg'},
      {path: 'assets/Images/mangoes.jpg'}
    ]
  }

}
