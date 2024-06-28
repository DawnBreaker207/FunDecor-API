import { Router } from 'express';
import { uploadImages } from '../controllers/images.controller';
import { upload } from '../middlewares/uploadImages';

const imageRoute = Router();

imageRoute.post('/upload', upload.single('upload'), uploadImages);
// imageRoute.delete('/remove/:publicId', removeImages);

export default imageRoute;
