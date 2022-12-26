import { prisma } from "../../../../database/prisma-client";

export class ListDeliverymanDeliveriesUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman,
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliveries;
  }
}