import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';

import { CreateContactController } from '@modules/contacts/useCases/createContact/CreateContactController';
import { ListContactsController } from '@modules/contacts/useCases/listContacts/ListContactsController';

const contactRoutes = Router();

const upload = multer(uploadConfig.multer);

const createContactController = new CreateContactController();
const listContactsController = new ListContactsController();

contactRoutes.get('/', listContactsController.handle);
contactRoutes.post('/', upload.single('avatar'), createContactController.handle);

export { contactRoutes };
