import { RequestHandler } from 'express';
import { ICurrentWeather, IReqBody } from '../models/currentWeather';
import axios, { AxiosResponse } from 'axios';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getCurrentWeather: RequestHandler = async (
  req,
  res
): Promise<void> => {
  const { location, language } = req.body as IReqBody;

  try {
    const response: AxiosResponse<ICurrentWeather> = await axios.get(
      `${BASE_URL}?q=${encodeURI(
        location
      )}&units=metric&lang=${language}&appid=${API_KEY}`
    );

    if (response.data) {
      res.status(200).send(response.data);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Something failed');
  }
};
