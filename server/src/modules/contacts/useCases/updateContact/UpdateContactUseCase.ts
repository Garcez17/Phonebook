import { inject, injectable } from "tsyringe";
import { Contact } from "@prisma/client";

import { IContactsRepository } from "@modules/contacts/repositories/IContactsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  contact_id: string;
  name: string;
  email: string;
  phone_number: string;
  avatar_filename: string | null;
}

@injectable()
class UpdateContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ name, email, avatar_filename, phone_number, contact_id }: IRequest): Promise<Contact> {
    const contact = await this.contactsRepository.findById(contact_id);

    if (!contact) throw new AppError('Contact not found.', 404);

    const findExistentContact = await this.contactsRepository.findByEmailOrPN({
      email,
      phone_number,
      contact_id: contact.id,
    });

    if (findExistentContact) throw new AppError('Contact with this data already exists.');

    if (avatar_filename) {
      await this.storageProvider.deleteFile(contact.avatar);

      await this.storageProvider.saveFile(avatar_filename);
    }

    return this.contactsRepository.update({
      contact_id: contact.id,
      avatar: avatar_filename,
      email,
      name,
      phone_number,
    })
  }
}

export { UpdateContactUseCase };
