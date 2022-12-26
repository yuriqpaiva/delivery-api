import { Request, Response } from 'express';
import { CreateDeliveryUseCase } from './create-delivery-use-case';

export class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { item_name } = request.body;
    const { id_client } = request;

    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const delivery = await createDeliveryUseCase.execute({
      id_client,
      item_name,
    });

    return response.json(delivery);
  }
}
