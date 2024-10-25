import { NextFunction, Request, Response } from 'express';

import { messageError, messagesSuccess } from '../constants/message';
import { statusCode } from '../constants/statusCode';
import Category from '../models/Category.model';
import Product from '../models/Product.model';

export const productControllers = {
  Get_All_Product: async (req: Request, res: Response, next: NextFunction) => {
    const { _page = 1, _limit = 10 } = req.query as unknown as {
      _page: number;
      _limit: number;
    };

    try {
      const data = await Product.find({ ...req.query })
        .limit(_limit * 1)
        .skip((_page - 1) * _limit)
        .sort({ createdAt: 1 })
        .populate('category');

      const COUNT = await Product.countDocuments();
      if (data && data.length > 0) {
        return res.status(statusCode.OK).json({
          message: messagesSuccess.GET_PRODUCT_SUCCESS,
          Total: data.length,
          totalPages: Math.ceil(COUNT / _limit),
          currentPage: _page,
          res: data,
        });
      }
      return res
        .status(statusCode.NOT_FOUND)
        .json({ message: messageError.NOT_FOUND });
    } catch (error) {
      next(error);
    }
  },
  // Query_Product: async (req: Request, res: Response, next: NextFunction) => {
  //   const page = parseInt(req.query._page as string) - 1 || 0;
  //   const limit = parseInt(req.query._limit as string) || 5;
  //   const search = (req.query._search as string) || '';
  //   const sort = (req.query._sort as string) || 'price';
  //   let category: string | string[] = (req.query._category as string) || 'All';
  //   let categoryOptions = await Category.find().populate('products');
  //   try {
  //     category === 'All'
  //       ? (category = categoryOptions.map((cat) => cat._id.toString()))
  //       : (category = (req?.query?._category as string).split(','));

  //     // req.query._sort ? (sort = req.query._sort.split(',')) : (sort = [sort]);
  //     const sortArray = sort.split(',');
  //     let sortBy: { [key: string]: SortOrder } = {};
  //     if (sortArray[1]) {
  //       sortBy[sortArray[0]] = sortArray[1] as SortOrder;
  //     } else {
  //       sortBy[sortArray[0]] = 'asc';
  //     }
  //     console.log(sort, sortBy);

  //     const productQuery = await Product.find({
  //       title: { $regex: search, $options: 'i' },
  //     })
  //       .where('category')
  //       // .in([...category])
  //       .sort(sortBy)
  //       .skip(page * limit)
  //       .limit(limit);

  //     const total = await Product.countDocuments({
  //       category: { $in: [...category] },
  //       name: { $regex: search, $options: 'i' },
  //     });
  //     const response = {
  //       // error: false,
  //       total,
  //       page: page + 1,
  //       limit,
  //       // category: categoryOptions,
  //       productQuery,
  //     };
  //     res.status(200).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  Create_Product: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.create(req.body);
      const updateCategory = await Category.findByIdAndUpdate(
        data.category,
        {
          $push: { products: data._id },
        },
        { new: true },
      );

      if (!data || !updateCategory) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.BAD_REQUEST });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.CREATE_PRODUCT_SUCCESS,
        res: data,
      });
    } catch (error) {
      next(error);
    }
  },
  Get_One_Product: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findById(req.params.id).populate('category');

      if (!data) {
        return res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.BAD_REQUEST });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.GET_PRODUCT_SUCCESS,
        res: data,
      });
    } catch (error) {
      next(error);
    }
  },
  Update_Product: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        { new: true },
      );
      if (!data) {
        res
          .status(statusCode.BAD_REQUEST)
          .json({ message: messageError.NOT_FOUND });
      }
      const updateCategory = await Category.findByIdAndUpdate(
        data?.category,
        {
          $push: { products: data?._id },
        },
        { new: true },
      );
      if (!data || !updateCategory) {
        return res.status(statusCode.NOT_FOUND).json({
          message: messageError.BAD_REQUEST,
        });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.UPDATE_PRODUCT_SUCCESS,
        res: data,
      });
    } catch (error) {
      next(error);
    }
  },
  //? SOFT DELETE. Should use this
  Hide_Product: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        { hide: true },
        { new: true },
      );
      if (!data) {
        return res.status(statusCode.BAD_REQUEST).json({
          message: messageError.BAD_REQUEST,
        });
      }
      return res.status(statusCode.CREATED).json({
        message: messagesSuccess.UPDATE_PRODUCT_SUCCESS,
        res: data,
      });
    } catch (error) {
      next(error);
    }
  },
  //! HARD DELETE. Not use this
  Delete_Product: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);
      if (data) {
        return res.status(statusCode.OK).json({
          message: messagesSuccess.DELETE_PRODUCT_SUCCESS,
        });
      }
      return res.status(statusCode.BAD_REQUEST).json({
        message: messageError.DELETE_FAIL,
      });
    } catch (error) {
      next(error);
    }
  },
};
