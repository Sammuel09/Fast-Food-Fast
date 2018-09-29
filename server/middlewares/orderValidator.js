import orders from '../models/model';

class orderValidator {
  static validatePostOrder(req, res, next) {
    const {
      userId, menuId, quantity, instruction,
    } = req.body;

    if (typeof userId !== 'number') {
      return res.status(400).json({ error: 'Invalid Request', message: 'UserID must be an integer' });
    }
    if (isNaN(userId) || (userId < 0) || (!Number.isInteger(userId))) {
      return res.status(400).json({ error: 'Invalid Request', message: 'UserID must be an integer' });
    }

    if (typeof menuId !== 'number') {
      return res.status(400).json({ error: 'Invalid Request', message: 'MenuID must be an integer' });
    }
    if (isNaN(menuId) || (menuId < 0) || (!Number.isInteger(menuId))) {
      return res.status(400).json({ error: 'Invalid Request', message: 'MenuID must be an integer' });
    }

    if (typeof quantity !== 'number') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Price must be an integer' });
    }
    if (isNaN(quantity) || (quantity < 0) || (!Number.isInteger(quantity))) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Price must be an integer' });
    }

    if (typeof instruction !== 'string') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Delivery Instructions must be a string' });
    }
    if (instruction.length < 1 || instruction === null) {
      return res.status(400).json({ error: 'Invalid Request. Cannot be an empty string or null', message: 'Delivery Instructions must be a string' });
    }
    if (instruction.trim().length < 1) {
      return res.status(400).json({ error: 'Invalid Request. Cannot contain white space', message: 'Deleivery Instructions must be a string' });
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

  static validateUpdateOrder(req, res, next) {
    const { orderStatus } = req.body;
    if (typeof orderStatus !== 'string') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Order Status must be a string' });
    }
    if (orderStatus.length < 1 || orderStatus === null) {
      return res.status(400).json({ error: 'Invalid Request. Cannot be an empty string or null', message: 'Order Status must be a string' });
    }
    if (orderStatus.trim().length < 1) {
      return res.status(400).json({ error: 'Invalid Request. Cannot contain white space', message: 'Order Status must be a string' });
    }
    if (orderStatus !== 'New' && orderStatus !== 'Processing' && orderStatus !== 'Cancelled' && orderStatus !== 'Complete') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Order Status must be either New, Processing, Cancelled or Complete' });
    }
    return next();
  }
}
export default orderValidator;
