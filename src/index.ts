import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import location from './routes/location';
import weather from './routes/weather';

const app = express();

app
  .use(cors())
  .use(json())
  .use('/location', location)
  .use('/weather', weather);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`WTW server listening at port ${PORT}...`));