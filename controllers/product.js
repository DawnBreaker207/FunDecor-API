import Product from '../models/Product.js';

export const productControllers = {
  getAll: async (req, res, next) => {
    try {
      const data = await Product.find({});

      if (data && data.length > 0) {
        return res.status(200).json({
          message: 'Take list success',
          data,
        });
      }
      return res.status(400).json({ message: 'Product Not Found' });
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      console.log(data);
      if (!data) {
        return res.status(400).json({ message: 'Add product fail ' });
      }
      return res.status(201).json({
        message: 'Add product success',
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
        return res.status(400).json({ message: 'Take data fail' });
      }
      return res.status(201).json({
        message: 'Take data success',
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
      if (!data) {
        return res.status(400).json({
          message: 'Update failed',
        });
      }
      return res.status(201).json({
        message: 'Update success',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  hide: async (req, res, next) => {
    try {
      const data = await Product.findByIdAndUpdate(
        `${req.params.id}`,
        { hide: true },
        { new: true }
      );
      if (!data) {
        return res.status(400).json({
          message: 'Update failed',
        });
      }
      return res.status(201).json({
        message: 'Update success',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const data = await Product.findByIdAndDelete(req.params.id);

      if (data) {
        return res.status(200).json({
          message: 'Delete Success',
        });
      }
      return res.status(400).json({
        message: 'Delete Failed',
      });
    } catch (error) {
      next(error);
    }
  },
};
