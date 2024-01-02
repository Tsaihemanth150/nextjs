// controllers/ordersController.js

import Order from '../models/Orders';

const createOrder = async (req, res) => {
  try {
    const { orderId, UserId, products, address, amount, status } = req.body;

    const order = new Order({
      orderId,
      UserId,
      products,
      address,
      amount,
      status,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { createOrder };
