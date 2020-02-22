import { RequestHandler } from 'express';
import { ICurrentWeather, IReqBody } from '../models/currentWeather';
import axios from 'axios';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getCurrentWeather: RequestHandler = (req, res):void => {
  const { location, language } = req.body as IReqBody;
  axios
    .get(
      `${BASE_URL}?q=${encodeURI(location)}&units=metric&lang=${language}&appid=${API_KEY}`
    )
    .then(response => response.data)
    .then((data: ICurrentWeather): void => {
      res.json(data);
    })
    .catch((error: Error): never => {
      throw new Error('Could not get current weather.')
    });
};
