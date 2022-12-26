import { Request, Response } from 'express';
import { ListClientDeliveriesUseCase } from './list-client-deliveries-use-case';

export class ListClientDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;

    const listClientDeliveriesUseCase = new ListClientDeliveriesUseCase();
    const deliveries = await listClientDeliveriesUseCase.execute(id_client);

    return response.json(deliveries);
  }
}
