import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  //These are declared in styles.scss and they are randomly picked
  snackBarStyles: Array<string> = ['accent-snackbar','white-snackbar','gradient-snackbar']

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [this.snackBarStyles[this.randomNumbers()]]
    });
  }

  randomNumbers(): number{
    return  Math.floor(Math.random() * (2 + 1));
  } 

}
