import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowContactProfileUseCase } from "./ShowContactProfileUseCase";

class ShowContactProfileController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { contact_id } = req.params;

    const showContactProfile = container.resolve(ShowContactProfileUseCase);

    const contacts = await showContactProfile.execute({
      contact_id,
    });

    return res.json(contacts);
  }
}

export { ShowContactProfileController };
