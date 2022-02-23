import { Contact } from "@prisma/client";

import { ICreateContactDTO } from "../dtos/ICreateContactDTO";
import { IFindByEmailOrPNDTO } from "../dtos/IFindByEmailOrPNDTO";
import { IUpdateContactDTO } from "../dtos/IUpdateContactDTO";

export interface IContactsRepository {
  find(): Promise<Contact[]>;
  findById(contact_id: string): Promise<Contact>;
  findByEmailOrPN(data: IFindByEmailOrPNDTO): Promise<Contact>;
  create(data: ICreateContactDTO): Promise<Contact>;
  update(data: IUpdateContactDTO): Promise<Contact>;
  delete(contact_id: string): Promise<void>;
}
