import { Router } from 'express';
import { ensureAuthenticatedClient } from './middlewares/ensure-authenticate-client';
import { ensureAuthenticatedDeliveryman } from './middlewares/ensure-authenticated-deliveryman';
import { AuthenticateClientController } from './modules/account/use-cases/authenticate-client/authenticate-client-controller';
import { AuthenticateDeliverymanController } from './modules/account/use-cases/authenticate-deliveryman/authenticate-deliveryman-controller';
import { CreateClientController } from './modules/clients/use-cases/create-client/create-client-controller';
import { ListClientDeliveriesController } from './modules/clients/use-cases/list-client-deliveries/list-client-deliveries-controller';
import { CreateDeliveryController } from './modules/deliveries/use-cases/create-delivery/create-delivery-controller';
import { FindAllAvailableDeliveriesController } from './modules/deliveries/use-cases/find-all-available-deliveries/find-all-available-deliveries-controller';
import { UpdateEndDateController } from './modules/deliveries/use-cases/update-end-date/update-end-date-controller';
import { UpdateDeliverymanController } from './modules/deliveries/use-cases/updateDeliveryman/update-deliveryman-controller';
import { CreateDeliverymanController } from './modules/deliveryman/use-cases/create-deliveryman/create-deliveryman-controller';
import { ListDeliverymanDeliveriesController } from './modules/deliveryman/use-cases/list-deliveryman-deliveries/list-deliveryman-deliveries-controller';

const routes = Router();

// Client
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const listClientDeliveriesController = new ListClientDeliveriesController();

routes.post('/client', createClientController.handle);
routes.post('/client/authenticate', authenticateClientController.handle);
routes.get(
  '/client/deliveries',
  ensureAuthenticatedClient,
  listClientDeliveriesController.handle
);

// Deliveryman
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const listDeliverymanDeliveriesController =
  new ListDeliverymanDeliveriesController();

routes.post('/deliveryman', createDeliverymanController.handle);
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle
);
routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticatedDeliveryman,
  listDeliverymanDeliveriesController.handle
);

// Delivery
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableDeliveriesController =
  new FindAllAvailableDeliveriesController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post(
  '/delivery',
  ensureAuthenticatedClient,
  createDeliveryController.handle
);

routes.get(
  '/delivery/available',
  ensureAuthenticatedDeliveryman,
  findAllAvailableDeliveriesController.handle
);

routes.put(
  '/delivery/update-deliveryman/:id',
  ensureAuthenticatedDeliveryman,
  updateDeliverymanController.handle
);

routes.put(
  '/delivery/update-end-date/:id',
  ensureAuthenticatedDeliveryman,
  updateEndDateController.handle
);

export { routes };
