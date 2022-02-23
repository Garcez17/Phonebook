import { container } from 'tsyringe';

import './providers';

import { ContactsRepository } from '../../modules/contacts/infra/prisma/repositories/ContactsRepository';
import { IContactsRepository } from '../../modules/contacts/repositories/IContactsRepository';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);
