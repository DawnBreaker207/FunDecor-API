import handleUpload from '../configs/cloudinaryConfig.js';
import { errorMessage, successMessages } from '../constants/message.js';

export const uploadImages = async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const data = await handleUpload(dataURI);
    if (data) {
      return res.status(200).json({
        message: successMessages.UPDATE_IMAGES_SUCCESS,
        data,
      });
    }
    return res.status(404).json({ message: errorMessage.UPLOAD_IMAGES_FAIL });
  } catch (error) {
    next();
  }
};
