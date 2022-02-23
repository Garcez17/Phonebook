import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListContactsUseCase } from "./ListContactsUseCase";

class ListContactsController {
  public async handle(_: Request, res: Response): Promise<Response> {
    const listContacts = container.resolve(ListContactsUseCase);

    const contacts = await listContacts.execute();

    return res.json(contacts);
  }
}

export { ListContactsController };
