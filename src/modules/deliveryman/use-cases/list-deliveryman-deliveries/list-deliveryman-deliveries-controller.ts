import { Request, Response } from 'express';
import { ListDeliverymanDeliveriesUseCase } from './list-deliveryman-deliveries-use-case';

export class ListDeliverymanDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;

    const listDeliverymanDeliveriesUseCase = new ListDeliverymanDeliveriesUseCase();
    const deliveries = await listDeliverymanDeliveriesUseCase.execute(id_deliveryman);

    return response.json(deliveries);
  }
}
