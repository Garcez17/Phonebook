import { inject, injectable } from "tsyringe";
import { Contact } from "@prisma/client";
import uploadConfig from '@config/upload';

import { IContactsRepository } from "@modules/contacts/repositories/IContactsRepository";

@injectable()
class ListContactsUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) { }

  public async execute(): Promise<Contact[]> {
    return (await this.contactsRepository.find()).map(contact => {
      return {
        ...contact,
        avatar_url: uploadConfig.driver === 'disk'
          ? `${process.env.APP_API_URL}/files/${contact.avatar}`
          : `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${contact.avatar}`
      }
    });
  }
}

export { ListContactsUseCase };
