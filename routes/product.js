import { Router } from 'express';
import { productControllers } from '../controllers/product.js';
import productSchema from '../validations/product.js';
import validBodyRequest from '../middlewares/validBodyRequest.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkIsAdmin } from '../middlewares/checkIsAdmin.js';

const productRouter = Router();

productRouter.get('/', productControllers.getAll);
productRouter.get('/:id', productControllers.getOne);

productRouter.use(checkAuth, checkIsAdmin);
productRouter.put('/hide/:id', productControllers.hide);
productRouter.delete('/delete/:id', productControllers.delete);

productRouter.use(validBodyRequest(productSchema)); //Middleware
productRouter.post('/', productControllers.add);
productRouter.put('/update/:id', productControllers.update);

export default productRouter;
