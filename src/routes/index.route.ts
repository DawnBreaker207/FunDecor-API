import { Router } from 'express';
import authRouter from './auth.route';
import cartRouter from './cart.route';
import categoryRouter from './category.route';
import orderRoute from './order.route';
import productRouter from './product.route';
import imageRoute from './upload.route';

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);
router.use('/images', imageRoute);
router.use('/cart', cartRouter);
router.use('/order', orderRoute);

export default router;
