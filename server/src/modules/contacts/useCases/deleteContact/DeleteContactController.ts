import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteContactUseCase } from "./DeleteContactUseCase";

class DeleteContactController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { contact_id } = req.params;

    const deleteContact = container.resolve(DeleteContactUseCase);

    await deleteContact.execute({
      contact_id,
    });

    return res.status(204).send();
  }
}

export { DeleteContactController };
