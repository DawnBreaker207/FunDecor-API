import { RequestHandler } from 'express';
import handleUpload from '../configs/cloudinaryConfig';
import { messageError, messagesSuccess } from '../constants/message';
import { statusCode } from '../constants/statusCode';

export const uploadImages: RequestHandler = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ error: messageError.BAD_REQUEST });
    }

    const b64 = Buffer.from(file.buffer).toString('base64');
    let dataURI = 'data:' + req?.file?.mimetype + ';base64,' + b64;
    const data = await handleUpload(dataURI);
    if (data) {
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.UPDATE_IMAGES_SUCCESS,
        data,
      });
    }
    return res
      .status(statusCode.NOT_FOUND)
      .json({ message: messageError.UPLOAD_IMAGES_FAIL });
  } catch (error) {
    next(error);
  }
};
