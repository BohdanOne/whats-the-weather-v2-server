import { RequestHandler } from 'express';
import { ILocation, IReqBody } from '../models/location';
import axios from 'axios';

const API_KEY = process.env.OPENCAGE_API_KEY;
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/';

const getLocation: RequestHandler = (req, res): void => {
  const { lat, long } = req.body as IReqBody;
  const query: string = encodeURI(`${lat},${long}`);

  axios
    .get(`${BASE_URL}/json?q=${query}&key=${API_KEY}`)
    .then(response => response.data)
    .then((data: ILocation): void => {
      if (data.results[0].components.town) {
        res.status(200).json({ location: data.results[0].components.town });
      } else {
        res.status(200).json({ location: data.results[0].components.city });
      }
    })
    .catch((error: Error): never => {
      throw new Error('Could not get location.');
    });
};

export default getLocation;
