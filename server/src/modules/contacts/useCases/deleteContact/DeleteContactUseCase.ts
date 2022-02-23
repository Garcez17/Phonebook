import { inject, injectable } from "tsyringe";

import { IContactsRepository } from "@modules/contacts/repositories/IContactsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  contact_id: string;
}

@injectable()
class DeleteContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ contact_id }: IRequest): Promise<void> {
    const contact = await this.contactsRepository.findById(contact_id);

    if (!contact) throw new AppError('Contact not found.', 404);

    await this.storageProvider.deleteFile(contact.avatar);

    await this.contactsRepository.delete(contact.id);
  }
}

export { DeleteContactUseCase };
