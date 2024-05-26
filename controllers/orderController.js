const orderRouter = require('express').Router();
const Order = require('../models/order');

orderRouter.post('/', async (request, response) => {
  const order = new Order(request.body);
  const result = await order.save();
  response.json(result);
});
module.exports = orderRouter;
