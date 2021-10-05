import { state, style, trigger, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  animations:[
    trigger('fadeText1',[
      state('void', style({ opacity:0, transform: 'translateY(0.3em)'})),
      transition('void => *', [
        animate('1000ms 2400ms')
      ])
    ]),
    trigger('fadeTitle',[
      state('void', style({ opacity:0, transform: 'translateY(0.3em)'})),
      transition('void => *', [
        animate('1000ms 1500ms')
      ])
    ]),
    trigger('fadeText2',[
      state('void', style({ opacity:0, transform: 'translateY(0.3em)'})),
      transition('void => *', [
        animate('1000ms 2600ms')
      ])
    ])
  ]
})
export class TitleComponent {

  constructor() { }

}
