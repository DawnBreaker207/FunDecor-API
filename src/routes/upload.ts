import { Router } from 'express';
import { uploadImages } from '../controllers/images';
import { upload } from '../middlewares/uploadImages';


const routeImages = Router();

routeImages.post('/upload', upload.single('upload'), uploadImages);
// routeImages.delete('/remove/:publicId', removeImages);

export default routeImages;
