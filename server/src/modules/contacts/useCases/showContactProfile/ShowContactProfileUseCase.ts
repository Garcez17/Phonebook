import { inject, injectable } from "tsyringe";
import { Contact } from "@prisma/client";

import { IContactsRepository } from "@modules/contacts/repositories/IContactsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  contact_id: string;
}

@injectable()
class ShowContactProfileUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) { }

  public async execute({ contact_id }: IRequest): Promise<Contact> {
    const contact = await this.contactsRepository.findById(contact_id);

    if (!contact) throw new AppError('Contact not found.', 404);

    Object.assign(contact, {
      avatar_url: `${process.env.APP_API_URL}/files/${contact.avatar}`,
    })

    return contact;
  }
}

export { ShowContactProfileUseCase };
