import { Router } from 'express';

import authRouter from './auth';
import cartRouter from './cart';
import categoryRouter from './category';
import orderRoute from './order';
import productRouter from './product';
import imageRoute from './upload';
const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);
router.use('/images', imageRoute);
router.use('/cart', cartRouter);
router.use('/order', orderRoute);

export default router;
