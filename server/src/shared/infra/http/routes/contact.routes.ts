import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';

import { CreateContactController } from '@modules/contacts/useCases/createContact/CreateContactController';
import { ListContactsController } from '@modules/contacts/useCases/listContacts/ListContactsController';
import { UpdateContactController } from '@modules/contacts/useCases/updateContact/UpdateContactController';
import { DeleteContactController } from '@modules/contacts/useCases/deleteContact/DeleteContactController';
import { ShowContactProfileController } from '@modules/contacts/useCases/showContactProfile/ShowContactProfileController';

const contactRoutes = Router();

const upload = multer(uploadConfig.multer);

const createContactController = new CreateContactController();
const listContactsController = new ListContactsController();
const showContactProfileController = new ShowContactProfileController();
const updateContactController = new UpdateContactController();
const deleteContactController = new DeleteContactController();

contactRoutes.get('/', listContactsController.handle);
contactRoutes.get('/:contact_id', showContactProfileController.handle);
contactRoutes.post('/', upload.single('avatar'), createContactController.handle);
contactRoutes.put('/:contact_id', upload.single('avatar'), updateContactController.handle);
contactRoutes.delete('/:contact_id', deleteContactController.handle);

export { contactRoutes };
