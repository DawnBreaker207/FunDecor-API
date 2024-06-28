import { Router } from 'express';
import { productControllers } from '../controllers/product.controller';
import { checkAuth } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';
import validBodyRequest from '../middlewares/validBodyRequest';
import productSchema from '../validations/product.validation';

const productRouter = Router();

productRouter.get('/', productControllers.Get_All_Product);
productRouter.get('/:id', productControllers.Get_One_Product);
// productRouter.get('/', productControllers.Query_Product);

productRouter.use(checkAuth, checkIsAdmin);
productRouter.put('/hide/:id', productControllers.Hide_Product);
productRouter.delete('/delete/:id', productControllers.Delete_Product);

productRouter.use(validBodyRequest(productSchema)); //Middleware
productRouter.post('/', productControllers.Create_Product);
productRouter.put('/update/:id', productControllers.Update_Product);

export default productRouter;
