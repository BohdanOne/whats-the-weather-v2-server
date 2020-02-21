import { RequestHandler } from 'express';
import axios from 'axios';

const API_KEY = process.env.OPENCAGE_API_KEY;
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/';

type GeocodeResponse = {
  results: { components: { town?: string; city?: string } }[];
};

const getLocation: RequestHandler = (req, res, next) => {
  const { lat, long } = req.body.coords;
  const query = encodeURI(`${lat},${long}`);

  return axios
    .get(`${BASE_URL}/json?q=${query}&key=${API_KEY}`)
    .then(response => response.data)
    .then((data: GeocodeResponse) => {
      if (data.results[0].components.town) {
        res.status(200).json({location: data.results[0].components.town});
      } else {
        res.status(200).json({location: data.results[0].components.city});
      }
    })
    .catch(e => {
      throw new Error('Could not get location.')
    });
};

export default getLocation;
