import { Router } from 'express';
import { createOrder, getOrder, getOrderById } from '../controllers/order.controller';

const orderRoute = Router();

orderRoute.post('/', createOrder);
orderRoute.get('/', getOrder);
orderRoute.get('/:userId/:orderId', getOrderById);
export default orderRoute;
