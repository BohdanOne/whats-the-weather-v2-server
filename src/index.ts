import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import errorHandler from './middlewares/errorHandler';
import locations from './routes/locations';

const app = express();

app.use(cors());
app.use(json());

app.use('/locations', locations);

app.use(errorHandler)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`WTW server listening at port ${PORT}...`));