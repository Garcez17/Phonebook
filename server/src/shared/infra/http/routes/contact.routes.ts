import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';

import { CreateContactController } from '@modules/contacts/useCases/createContact/CreateContactController';

const contactRoutes = Router();

const upload = multer(uploadConfig.multer);

const createContactController = new CreateContactController();

contactRoutes.post('/', upload.single('avatar'), createContactController.handle);

export { contactRoutes };
