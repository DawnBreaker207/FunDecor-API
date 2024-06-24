import { Router } from 'express';

import authRouter from './auth';
import categoryRouter from './category';
import productRouter from './product';
import routeImages from './upload';
const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);
router.use('/images', routeImages);

export default router;
