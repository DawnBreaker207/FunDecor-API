import { errorMessage, successMessages } from '../constants/message.js';
import Product from '../models/Product.js';
import { validBody } from '../utils/validBody.js';
import productSchema from '../validations/product.js';
export const productControllers = {
  getAll: async (req, res, next) => {
    try {
      const data = await Product.find({});

      if (data && data.length > 0) {
        return res.status(200).json({
          message: successMessages.GET_PRODUCT_SUCCESS,
          data,
        });
      }
      return res.status(404).json({ message: errorMessage.NOT_FOUND });
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      const resultValid = validBody(req.body, productSchema);
      if (resultValid) {
        return res.status(400).json({ message: resultValid.errors });
      }
      console.log(data);
      if (!data) {
        return res.status(400).json({ message: errorMessage.BAD_REQUEST });
      }
      return res.status(201).json({
        message: successMessages.CREATE_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const data = await Product.findById(req.params.id);

      if (!data) {
        return res.status(400).json({ message: errorMessage.BAD_REQUEST });
      }
      return res.status(201).json({
        message: successMessages.GET_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const resultValid = validBody(req.body, productSchema);
      if (resultValid) {
        return res.status(400).json({ message: resultValid.errors });
      }
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        { new: true }
      );
      if (!data) {
        return res.status(404).json({
          message: errorMessage.BAD_REQUEST,
        });
      }
      return res.status(201).json({
        message: successMessages.UPDATE_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  //? SOFT DELETE. Should use this
  hide: async (req, res, next) => {
    try {
      const resultValid = validBody(req.body, productSchema);
      if (resultValid) {
        return res.status(400).json({ message: resultValid.errors });
      }
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        { hide: true },
        { new: true }
      );
      if (!data) {
        return res.status(400).json({
          message: errorMessage.BAD_REQUEST,
        });
      }
      return res.status(201).json({
        message: successMessages.UPDATE_PRODUCT_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  //! HARD DELETE. Not use this
  delete: async (req, res, next) => {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(200).json({
          message: successMessages.DELETE_PRODUCT_SUCCESS,
        });
      }
      return res.status(400).json({
        message: errorMessage.DELETE_FAIL,
      });
    } catch (error) {
      next(error);
    }
  },
};
