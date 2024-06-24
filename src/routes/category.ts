import { Router } from 'express';
import { CategoryControllers } from '../controllers/category';
import { checkAuth } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';
import validBodyRequest from '../middlewares/validBodyRequest';
import CategorySchema from '../validations/category';




const categoryRouter = Router();

categoryRouter.get('/', CategoryControllers.getAll);
categoryRouter.get('/:id', CategoryControllers.getOne);

categoryRouter.use(checkAuth, checkIsAdmin);
categoryRouter.put('/hide/:id', CategoryControllers.hide);
categoryRouter.delete('/delete/:id', CategoryControllers.delete);

categoryRouter.use(validBodyRequest(CategorySchema)); //Middleware
categoryRouter.post('/', CategoryControllers.add);
categoryRouter.put('/update/:id', CategoryControllers.update);

export default categoryRouter;
