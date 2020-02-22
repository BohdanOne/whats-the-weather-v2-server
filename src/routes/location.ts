import { Router } from 'express';

import getLocation from '../controllers/location';

const router = Router();

router.post('/', getLocation);

export default router;