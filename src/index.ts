import express from 'express';
import { json } from 'body-parser';

import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(json());

app.use('/', () => console.log('test'))

app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`WTW server listening at port ${PORT}...`));