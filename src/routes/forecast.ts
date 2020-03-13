import { Router } from 'express';

import { getForecast } from '../controllers/forecast';

const router = Router();

router.post('/', getForecast);

export default router;