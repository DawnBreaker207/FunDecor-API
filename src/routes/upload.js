import { Router } from 'express';
import { uploadImages } from '../controllers/images.js';
import { upload } from '../middlewares/uploadImages.js';
const routeImages = Router();

routeImages.post('/upload', upload.single('upload'), uploadImages);
// routeImages.delete('/remove/:publicId', removeImages);

export default routeImages;
