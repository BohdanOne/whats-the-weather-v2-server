export interface ICurrentWeather {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure: number; // hPa
    humidity: number; // %
  };
  visibility?: number;
  wind?: {
    speed?: number; // m/s
    deg?: number;
  };
  clouds?: { all?: number }; // %
  rain?: { '1h'?: number }; // mm
  snow?: { '1h'?: number }; // mm
};

export interface IReqBody {
  location: string;
  language: string;
}