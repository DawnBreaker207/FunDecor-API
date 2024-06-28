import { Router } from 'express';
import {
  addItemToCart,
  getCartByUserId,
  removeFromCart,
  updateProductQuantity,
} from '../controllers/cart.controller';

const cartRouter = Router();

cartRouter.get('/:userId', getCartByUserId);
cartRouter.post('/add-to-cart', addItemToCart);
cartRouter.post('/update-product-quantity', updateProductQuantity);
cartRouter.delete('/remove-cart', removeFromCart);
export default cartRouter;
