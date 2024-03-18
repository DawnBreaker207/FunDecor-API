import { Router } from 'express';
import { productControllers } from '../controllers/product.js';

const productRouter = Router();

productRouter.get('/', productControllers.getAll);

productRouter.post('/', productControllers.add);

productRouter.get('/:id', productControllers.getOne);

productRouter.put('/update/:id', productControllers.update);

productRouter.put('/hide/:id', productControllers.hide);

productRouter.delete('/:id', productControllers.delete);

export default productRouter;
