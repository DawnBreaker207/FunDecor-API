import { errorMessage, successMessages } from '../constants/message.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
export const productControllers = {
  getAll: async (req, res, next) => {
    const { page = 1, limit = 20 } = req.query;

    try {
      parseInt(limit);
      parseInt(page) || 1;
      const data = await Product.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: 1 })
        .populate('category');

      const COUNT = await Product.countDocuments();
      if (data && data.length > 0) {
        return res.status(200).json({
          message: successMessages.GET_PRODUCT_SUCCESS,
          Total: data.length,
          totalPages: Math.ceil(COUNT / limit),
          currentPage: page,
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
      const updateCategory = await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id },
        },
        { new: true }
      );

      if (!data || !updateCategory) {
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
      const data = await Product.findById(req.params.id).populate('category');

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
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        { new: true }
      );
      const updateCategory = await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id },
        },
        { new: true }
      );
      if (!data || !updateCategory) {
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
