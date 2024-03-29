import { animate, state, style, transition, trigger } from '@angular/animations';


export const fade = trigger('fade',[
  state('void', style({ opacity:0 })),
  transition('void => *', [
    animate('400ms')
  ])
])

