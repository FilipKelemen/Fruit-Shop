import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountriesService } from 'src/app/services/countries and counties/countries.service';
import { CountiesDTO, CountryDataDTO } from 'src/app/services/countries and counties/models';

@Component({
  selector: 'app-country-selection-item',
  templateUrl: './country-selection-item.component.html',
  styleUrls: ['./country-selection-item.component.scss']
})
export class CountrySelectionItemComponent {

  constructor(private countriesService : CountriesService){ }

  @Input()
  countryItem!: CountryDataDTO;

  needRequestCounty:boolean = true;
  
  counties$!: Observable<CountiesDTO>;

  getCounties(country: string) { //Only getting the data from the db once
    // if(this.needRequestCounty){
      this.counties$ = this.countriesService.getAllCounties(country); // passing the country of which i want all the states
      this.needRequestCounty = false;
    // }
  }
}
