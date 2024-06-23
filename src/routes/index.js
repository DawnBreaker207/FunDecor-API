import { Router } from 'express';
import authRouter from './auth.js';
import categoryRouter from './category.js';
import productRouter from './product.js';
import routeImages from './upload.js';

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);
router.use('/images', routeImages);

export default router;
