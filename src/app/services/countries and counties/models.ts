export interface CountriesWithFlagsDTO {
  error: boolean;
  msg: string;
  data: CountryDataDTO[];
}

export interface CountryDataDTO {
  name: string;
  flag: string;
}

export interface CountiesDTO {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso3: string;
    states: StatesDTO[];
  }
}

export interface StatesDTO{
  name: string;
  state_code: string;
}