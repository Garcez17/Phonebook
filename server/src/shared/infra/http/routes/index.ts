import { Router } from 'express';

const router = Router();

import { contactRoutes } from './contact.routes';

router.use('/contacts', contactRoutes);

export { router };
