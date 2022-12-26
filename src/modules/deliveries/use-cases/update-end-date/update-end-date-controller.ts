import { UpdateEndDateUseCase } from './update-end-date-use-case';
import { Request, Response } from 'express';

export class UpdateEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const updateEndDate = new UpdateEndDateUseCase();

    const delivery = await updateEndDate.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.json(delivery);
  }
}
