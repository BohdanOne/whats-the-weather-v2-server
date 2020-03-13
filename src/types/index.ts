/* Request Body Types
=============================================================================*/
export interface IReqBodyLocation {
  lat: string;
  long: string;
}

export interface IReqBodyWeather {
  location: string;
  language: string;
}

/* Incoming API Response Types
=============================================================================*/
export interface ILocationResponse {
  results: {
    components: {
      town?: string;
      city?: string;
    };
  }[];
}

interface IWeatherRes {
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind?: {
    speed?: number;
    deg?: number;
  };
  clouds?: { all?: number };
}

export interface IForecastRes extends IWeatherRes {
  rain?: { '3h': number };
  snow?: { '3h': number };
  dt_txt: string;
}

export interface ICurrentWeatherRes extends IWeatherRes {
  name: string;
  visibility?: number;
  rain?: { '1h': number };
  snow?: { '1h': number };
}

export interface IForecastListRes {
  list: IForecastRes[];
}

/* Formatted Response Types
=============================================================================*/
export interface IWeather {
  icon: string;
  description: string;
  temp: string;
  feelsLike: string;
  pressure: string;
  humidity: string;
  precipitation: string;
  wind: string;
  clouds: string;
}

export interface IForecast extends IWeather {
  day: string;
}