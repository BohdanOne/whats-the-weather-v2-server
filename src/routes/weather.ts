import { Router } from 'express';

import { getCurrentWeather } from '../controllers/weather';

const router = Router();

router.post('/', getCurrentWeather);

export default router;