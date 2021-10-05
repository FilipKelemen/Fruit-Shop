import { Injectable } from '@angular/core';
import * as luxon from 'luxon';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setLocalStorage(responseObj:any): void {
    const expiresInDate = luxon.DateTime.now().plus({days: responseObj.expiresIn.slice(0,-1)}); // i have to receive it in this format: 1d

    localStorage.setItem('token',responseObj.token);
    localStorage.setItem('expiresInDate',JSON.stringify(expiresInDate.valueOf())); //It's stored in ms
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresInDate');
  }

  isLoggedIn(): boolean {
    return luxon.DateTime.now() < this.getExpiration();
  }

  isLoggedOut(): boolean {
    return luxon.DateTime.now() > this.getExpiration();
  }

  getExpiration(): DateTime {
    const expiresInMs = localStorage.getItem('expiresInDate');
    const expiresInMsParsed = JSON.parse(expiresInMs!);
    return luxon.DateTime.fromMillis(expiresInMsParsed);
  }

}
