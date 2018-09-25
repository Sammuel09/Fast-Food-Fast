import orders from '../models/model';

class orderValidator {
  static validatePostOrder(req, res, next) {
    const {
      fooditem, price, quantity, address, completed,
    } = req.body;

    if (typeof fooditem !== 'string') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Fooditem must be a string' });
    }
    if (fooditem.length < 1 || fooditem === null) {
      return res.status(400).json({ error: 'Invalid Request. Cannot be an empty string or null', message: 'Fooditem must be a string' });
    }
    if (fooditem.trim().length < 1) {
      return res.status(400).json({ error: 'Invalid Request. Cannot contain white space', message: 'Fooditem must be a string' });
    }

    if (typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Price must be an integer' });
    }
    if (isNaN(price) || (price < 0) || (!Number.isInteger(price))) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Price must be an integer' });
    }
    if (typeof quantity !== 'number') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Quantity must be an integer' });
    }
    if (isNaN(quantity) || (quantity < 0) || (!Number.isInteger(quantity))) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Quantity must be an integer' });
    }
    if (typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Address must be a string' });
    }
    if (address.length < 1 || address === null) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Address must be a string' });
    }

    if (address.trim().length < 1) {
      return res.status(400).json({ error: 'Invalid Request. Cannot contain white space', message: 'Address must be a string' });
    }
    if (!(typeof completed === 'boolean')) {
      return res.status(400).json({
        error: 'Invalid Request',
        message: 'Completed must be a boolean',
      });
    }
    return next();
  }

  static validateGetOrder(req, res, next) {
    const order = orders.find(orderItem => orderItem.id === parseInt(req.params.id, 10));

    if (!(order)) {
      return res.status(404).json({ error: 'Order not found', message: 'The Order with the given ID was not found' });
    }
    req.body.order = order;
    return next();
  }
}
export default orderValidator;
