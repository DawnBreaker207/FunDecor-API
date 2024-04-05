import { Router } from 'express';

import validBodyRequest from '../middlewares/validBodyRequest.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkIsAdmin } from '../middlewares/checkIsAdmin.js';
import { CategoryControllers } from '../controllers/category.js';
import CategorySchema from '../validations/category.js';

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
