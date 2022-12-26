import { Request, Response } from 'express';
import { FindAllAvailableDeliveriesUseCase } from './find-all-available-deliveries-use-case';

export class FindAllAvailableDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllAvailableDeliveriesUseCase = new FindAllAvailableDeliveriesUseCase();

    const deliveries = await findAllAvailableDeliveriesUseCase.execute();

    return response.json(deliveries);
  }
}
