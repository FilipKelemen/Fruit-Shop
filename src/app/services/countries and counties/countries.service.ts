import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountiesDTO, CountriesWithFlagsDTO } from './models';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private api: string= 'https://countriesnow.space/api/v0.1/countries'; //Getting all the countries and their flags
  constructor( private http: HttpClient) { }

  getAllCountries(): Observable<CountriesWithFlagsDTO>{
    return this.http.get<CountriesWithFlagsDTO>(this.api+'/flag/images');
  }

  getAllCounties(country: string): Observable<CountiesDTO>{
    console.log(country);
    return this.http.post<CountiesDTO>('https://countriesnow.space/api/v0.1/countries/states',{"country": country});
  }
}
