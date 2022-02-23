import { Contact } from "@prisma/client";
import { inject, injectable } from 'tsyringe';

import { AppError } from "@shared/errors/AppError";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { IContactsRepository } from "../../repositories/IContactsRepository";

interface IRequest {
  name: string;
  email: string;
  phone_number: string;
  avatar_filename: string;
}

@injectable()
class CreateContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ name, email, avatar_filename, phone_number }: IRequest): Promise<Contact> {
    const findExistentContact = await this.contactsRepository.findByEmailOrPN({
      email,
      phone_number,
    });

    if (findExistentContact) throw new AppError('Contact already exists.');

    await this.storageProvider.saveFile(avatar_filename);

    return this.contactsRepository.create({
      avatar: avatar_filename,
      email,
      name,
      phone_number,
    })
  }
}

export { CreateContactUseCase };
