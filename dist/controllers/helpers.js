"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWeatherResponse = function (data, lang) {
    return {
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        temp: data.main.temp.toFixed(1) + "\u00B0C",
        feelsLike: data.main.feels_like.toFixed(1) + "\u00B0C",
        pressure: data.main.pressure + "hPa",
        humidity: data.main.humidity + "%",
        precipitation: precipitationWeather(data, lang),
        wind: data.wind
            ? data.wind.speed + "m/s " + windDirection(data.wind.deg)
            : '',
        clouds: data.clouds
            ? data.clouds.all + "% "
            : ''
    };
};
exports.formatForecastResponse = function (data, lang) {
    var dailyForecastAtNoon = data.list.filter(function (forecast) {
        return forecast.dt_txt.slice(11, 13) === '12';
    });
    return dailyForecastAtNoon.map(function (forecast) {
        return {
            day: decodeDay(forecast.dt_txt, lang),
            date: forecast.dt_txt.slice(0, 9),
            icon: forecast.weather[0].icon,
            description: forecast.weather[0].description,
            temp: forecast.main.temp.toFixed(1) + "\u00B0C",
            feelsLike: forecast.main.feels_like.toFixed(1) + "\u00B0C",
            pressure: forecast.main.pressure + "hPa",
            humidity: forecast.main.humidity + "%",
            precipitation: precipitationForecast(forecast, lang),
            wind: forecast.wind
                ? forecast.wind.speed + "m/s " + windDirection(forecast.wind.deg)
                : '',
            clouds: forecast.clouds
                ? forecast.clouds.all + "% "
                : ''
        };
    });
};
var precipitationWeather = function (data, lang) {
    if (data.rain) {
        return (lang === 'en' ? 'rain' : 'deszcz') + " " + (data.rain['1h'] || '0') + "mm";
    }
    if (data.snow) {
        return (lang === 'en' ? 'snow' : 'śnieg') + " " + (data.snow['1h'] || '0') + "mm";
    }
    return '0';
};
var precipitationForecast = function (data, lang) {
    if (data.rain) {
        return (lang === 'en' ? 'rain' : 'deszcz') + " " + (data.rain['3h'] || '0') + "mm";
    }
    if (data.snow) {
        return (lang === 'en' ? 'snow' : 'śnieg') + " " + (data.snow['3h'] || '0') + "mm";
    }
    return '0';
};
var windDirection = function (degs) {
    if (degs >= 350 && degs < 10)
        return 'N';
    if (degs >= 10 && degs < 80)
        return 'NE';
    if (degs >= 80 && degs < 100)
        return 'E';
    if (degs >= 100 && degs < 170)
        return 'SE';
    if (degs >= 180 && degs < 190)
        return 'S';
    if (degs >= 190 && degs < 260)
        return 'SW';
    if (degs >= 260 && degs < 280)
        return 'W';
    return 'NW';
};
var decodeDay = function (date, lang) {
    var days = [];
    if (lang === 'pl') {
        days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
    }
    else {
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
    return "" + days[new Date(date).getDay()];
};
