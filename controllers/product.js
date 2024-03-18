import Product from '../models/Product.js';

export const productControllers = {
  getAll: async (req, res) => {
    try {
      // const { data } = await instance.get('/products');
      const data = await Product.find({});

      if (data && data.length > 0) {
        return res.status(200).json({
          message: 'Take list success',
          data,
        });
      }
      return res.status(400).json({ message: 'Product Not Found' });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  add: async (req, res) => {
    try {
      // const { data } = await instance.post('/products', res.body);
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
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  getOne: async (req, res) => {
    try {
      // const { data } = await instance.get(`/products/${req.params.id}`);
      const data = await Product.findById(req.params.id);

      if (!data) {
        return res.status(400).json({ message: 'Take data fail' });
      }
      return res.status(201).json({
        message: 'Take data success',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      // const { data } = await instance.put(
      //   `/products/${req.params.id}`,
      //   req.body
      // );
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
      return res.status(500).json({
        name: error.name,
        message: error.name,
      });
    }
  },
  hide: async (req, res) => {
    try {
      // const { data } = await instance.put(
      //   `/products/${req.params.id}`,
      //   req.body
      // );
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
      return res.status(500).json({
        name: error.name,
        message: error.name,
      });
    }
  },
  delete: async (req, res) => {
    try {
      // const { status } = await instance.delete(`/products/${req.params.id}`);
      const data = await Product.findByIdAndDelete(req.params.id);
      // console.log(status);
      // if (status != 200) {
      //   return res.status(400).json({ message: 'Delete Failed' });
      // }
      if (data) {
        return res.status(200).json({
          message: 'Delete Success',
          data,
        });
      }
      return res.status(400).json({
        message: 'Delete Failed',
        data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
