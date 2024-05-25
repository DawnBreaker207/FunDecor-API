// import cloudinary from '../configs/cloudinaryConfig.js';
// import { successMessages } from '../constants/message.js';
// export const uploadImages = async (req, res, next) => {
//   try {
//     const images = req.files.map(({ path }) => path);

//     const uploadImages = [];
//     for (const image of images) {
//       const results = await cloudinary.uploader.upload(image);
//       uploadImages.push({
//         url: results.secure_url,
//         publicId: results.public_id,
//       });
//     }
//     return res.status(200).json({
//       message: successMessages.UPDATE_IMAGES_SUCCESS,
//       data: uploadImages,
//     });
//   } catch (error) {
//     next();
//   }
// };

// export const removeImages = async (req, res, next) => {
//   try {
//     const publicId = req.params.publicId;
//     const folder = 'nodejs/';
//     const path = folder.concat(publicId);
//     const results = await cloudinary.uploader.destroy(path);
//     console.log(results);
//     if (results.result === 'Not Found') {
//       throw new Error('Delete images fails');
//     }
//     return res.status(200).json({
//       message: successMessages.DELETE_IMAGES_SUCCESS,
//       data: uploadImages,
//     });
//   } catch (error) {
//     next();
//   }
// };
