import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../configs/cloudinaryConfig.js';

export const uploadImagesMiddleware = (fieldName, maxCount) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'nodejs',
      format: 'jpg',
    },
  });
  const upload = multer({ storage: storage });
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, () => {
      next();
    });
  };
};
