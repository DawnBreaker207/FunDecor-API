import express from 'express';
import axios from 'axios';
const PORT = 8888;
const app = express();

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});
app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const { data } = await instance.get('/products');
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
});

app.post('/products', async (req, res) => {
  try {
    const { data } = await instance.post('/products', res.body);
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
});

app.get('/products/:id', async (req, res) => {
  try {
    const { data } = await instance.get(`/products/${req.params.id}`);
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
});

app.put('/products/:id', async (req, res) => {
  try {
    const { data } = await instance.put(`/products/${req.params.id}`, req.body);
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
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { status } = await instance.delete(`/products/${req.params.id}`);
    console.log(status);
    if (status != 200) {
      return res.status(400).json({ message: 'Delete Failed' });
    }
    return res.status(200).json({
      message: 'Delete Success',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Listen on port http://localhost:${PORT}`);
});
