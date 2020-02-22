import { RequestHandler } from 'express';
import { ILocation, IReqBody } from '../models/location';
import axios, { AxiosResponse } from 'axios';

const API_KEY = process.env.OPENCAGE_API_KEY;
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/';

const getLocation: RequestHandler = async (req, res): Promise<void> => {
  const { lat, long } = req.body as IReqBody;
  const query: string = encodeURI(`${lat},${long}`);

  try {
    const response: AxiosResponse<ILocation> = await axios.get(
      `${BASE_URL}/json?q=${query}&key=${API_KEY}`
    );

    if (response.data.results.length > 0) {
      if (response.data.results[0].components.town) {
        res
          .status(200)
          .send(response.data.results[0].components.town);
      } else {
        res
          .status(200)
          .send(response.data.results[0].components.city);
      }
    } else {
      res.status(404).send('Could not find given location')
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Something failed');
  }
};

export default getLocation;
