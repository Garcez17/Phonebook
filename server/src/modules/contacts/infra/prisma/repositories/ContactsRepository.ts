import { IUpdateContactDTO } from "@modules/contacts/dtos/IUpdateContactDTO";
import { Contact } from "@prisma/client";
import { prisma } from "@shared/infra/prisma/prismaClient";

import { ICreateContactDTO } from "../../../dtos/ICreateContactDTO";
import { IFindByEmailOrPNDTO } from "../../../dtos/IFindByEmailOrPNDTO";

import { IContactsRepository } from "../../../repositories/IContactsRepository";

class ContactsRepository implements IContactsRepository {
  public async find(): Promise<Contact[]> {
    return prisma.contact.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  }

  public async findById(contact_id: string): Promise<Contact> {
    return prisma.contact.findUnique({
      where: {
        id: contact_id,
      }
    });
  }

  public async findByEmailOrPN({ email, phone_number, contact_id }: IFindByEmailOrPNDTO): Promise<Contact> {
    return prisma.contact.findFirst({
      where: {
        AND: [
          {
            id: {
              not: contact_id,
            }
          },
          {
            OR: [
              {
                email,
              },
              {
                phone_number,
              }
            ]
          }
        ]
      }
    });
  }

  public async create(data: ICreateContactDTO): Promise<Contact> {
    return prisma.contact.create({
      data,
    })
  }

  public async update({ avatar, contact_id, email, name, phone_number }: IUpdateContactDTO): Promise<Contact> {
    return prisma.contact.update({
      where: {
        id: contact_id,
      },
      data: {
        avatar,
        email,
        name,
        phone_number,
      }
    })
  }

  public async delete(contact_id: string): Promise<void> {
    await prisma.contact.delete({
      where: {
        id: contact_id,
      }
    })
  }
}

export { ContactsRepository };
