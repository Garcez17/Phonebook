import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateContactUseCase } from "./UpdateContactUseCase";

class UpdateContactController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { contact_id } = req.params;
    const { name, email, phone_number } = req.body;

    const updateContact = container.resolve(UpdateContactUseCase);

    const contact = await updateContact.execute({
      name,
      avatar_filename: req.file.filename,
      contact_id,
      email,
      phone_number,
    })

    return res.json(contact);
  }
}

export { UpdateContactController };
