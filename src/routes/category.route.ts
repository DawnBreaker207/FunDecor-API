import { Router } from 'express';
import { CategoryControllers } from '../controllers/category.controller';
import { checkAuth } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';
import validBodyRequest from '../middlewares/validBodyRequest';
import CategorySchema from '../validations/category.validation';

const categoryRouter = Router();

categoryRouter.get('/', CategoryControllers.Get_All_Category);
categoryRouter.get('/:id', CategoryControllers.Get_One_Category);

categoryRouter.use(checkAuth, checkIsAdmin);
categoryRouter.put('/hide/:id', CategoryControllers.Hide_Category);
categoryRouter.delete('/delete/:id', CategoryControllers.Delete_Category);

categoryRouter.use(validBodyRequest(CategorySchema)); //Middleware
categoryRouter.post('/', CategoryControllers.Create_Category);
categoryRouter.put('/update/:id', CategoryControllers.Update_Category);

export default categoryRouter;
