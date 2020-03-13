import { ICurrentWeatherRes, IWeather, IForecastListRes, IForecastRes, IForecast } from '../types';

export const formatWeatherResponse: (
  data: ICurrentWeatherRes,
  lang: string
) => IWeather = (data, lang) => {
  return {
    icon: data.weather[0].icon,
    description: data.weather[0].description,
    temp: `${data.main.temp.toFixed(1)}°C`,
    feelsLike: `${data.main.feels_like.toFixed(1)}°C`,
    pressure: `${data.main.pressure}hPa`,
    humidity: `${data.main.humidity}%`,
    precipitation: precipitationWeather(data, lang),
    wind: data.wind
      ? `${data.wind.speed}m/s ${windDirection(data.wind.deg!)}`
      : '',
      clouds: data.clouds
      ? `${data.clouds.all}% `
      : ''
  };
};

export const formatForecastResponse = (data: IForecastListRes, lang: string): IForecast[] => {
  const dailyForecastAtNoon = data.list.filter(forecast => {
    return forecast.dt_txt.slice(11, 13) === '12';
  });
  return dailyForecastAtNoon.map(forecast => {
    return {
      day: decodeDay(forecast.dt_txt, lang),
      icon: forecast.weather[0].icon,
      description: forecast.weather[0].description,
      temp: `${forecast.main.temp.toFixed(1)}°C`,
      feelsLike: `${forecast.main.feels_like.toFixed(1)}°C`,
      pressure: `${forecast.main.pressure}hPa`,
      humidity: `${forecast.main.humidity}%`,
      precipitation: precipitationForecast(forecast, lang),
      wind: forecast.wind
        ? `${forecast.wind.speed}m/s ${windDirection(forecast.wind.deg!)}`
        : '',
      clouds: forecast.clouds
        ? `${forecast.clouds.all}% `
        : ''
    }
  })
};

const precipitationWeather = (data: ICurrentWeatherRes, lang: string): string => {
  if (data.rain) {
    return `${lang === 'en' ? 'rain' : 'deszcz'} ${data.rain['1h']}mm`;
  }
  if (data.snow) {
    return `${lang === 'en' ? 'snow' : 'śnieg'} ${data.snow['1h']}mm`;
  }
  return '0';
};

const precipitationForecast = (data: IForecastRes, lang: string): string => {
  if (data.rain) {
    return `${lang === 'en' ? 'rain' : 'deszcz'} ${data.rain['3h']}mm`;
  }
  if (data.snow) {
    return `${lang === 'en' ? 'snow' : 'śnieg'} ${data.snow['3h']}mm`;
  }
  return '0';
};

const windDirection = (degs: number): string => {
  if (degs >= 350 && degs < 10) return 'N';
  if (degs >= 10 && degs < 80) return 'NE';
  if (degs >= 80 && degs < 100) return 'E';
  if (degs >= 100 && degs < 170) return 'SE';
  if (degs >= 180 && degs < 190) return 'S';
  if (degs >= 190 && degs < 260) return 'SW';
  if (degs >= 260 && degs < 280) return 'W';
  return 'NW';
};

const decodeDay = (date: string, lang: string): string => {
  let days = [];
  if (lang === 'pl') {
    days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  } else {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  return `${days[new Date(date).getDay()]} ${date.slice(0, 10)}`;
}