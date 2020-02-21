import { Router } from 'express';

import getLocation from '../controllers/locations';

const router = Router();

router.post('/', getLocation);

export default router;