import { state, style, trigger, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation-image',
  templateUrl: './presentation-image.component.html',
  styleUrls: ['./presentation-image.component.scss'],
  animations: [
    trigger('fadeImage',[
      state('void', style( {opacity:0, transform: 'translateX(0.4em)'} )),
      transition('void => *', [
        animate('1300ms 2700ms')
      ])
    ]),
    trigger('fadeButton',[
      state('void', style( {opacity:0} )),
      transition('void => *', [
        animate('1000ms 2700ms')
      ])
    ])
  ]
})
export class PresentationImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
