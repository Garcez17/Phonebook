import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateContactUseCase } from "./CreateContactUseCase";

class CreateContactController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, phone_number } = req.body;

    const createContact = container.resolve(CreateContactUseCase);

    const contact = await createContact.execute({
      name,
      email,
      phone_number,
      avatar_filename: req.file.filename,
    });

    return res.status(201).json(contact);
  }
}

export { CreateContactController };
