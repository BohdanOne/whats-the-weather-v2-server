import { RequestHandler } from 'express';
import { formatForecastResponse } from './helpers';
import { IForecastListRes, IReqBodyWeather } from '../types';
import axios, { AxiosResponse } from 'axios';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getForecast: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { location, language } = req.body as IReqBodyWeather;
  try {
    const response: AxiosResponse<IForecastListRes> = await axios.get(
      `${BASE_URL}?q=${encodeURI(
        location
      )}&units=metric&lang=${language}&appid=${API_KEY}`
    );

    if (response.data) {
      res.status(200).send(formatForecastResponse(response.data, language));
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Something failed');
  }
};

