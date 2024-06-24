import { RequestHandler } from 'express';
import handleUpload from '../configs/cloudinaryConfig';
import { errorMessage, successMessages } from '../constants/message';

export const uploadImages: RequestHandler = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: errorMessage.BAD_REQUEST });
    }

    const b64 = Buffer.from(file.buffer).toString('base64');
    let dataURI = 'data:' + req?.file?.mimetype + ';base64,' + b64;
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
