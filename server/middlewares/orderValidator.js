import { isNumber } from 'util';

class orderValidator {
  static orderValidate(req, res, next) {
    const {
      fooditem, price, quantity, address, completed,
    } = req.body;

    if (typeof fooditem !== 'string') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Fooditem must be a string' });
    }
    if (fooditem.length < 1 || fooditem === null) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Fooditem must be a string' });
    }
    if (fooditem === new RegExp('\\s')) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Fooditem must be a string' });
    }
    if (typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Price must be a integer' });
    }
    if (isNaN(price) || (price < 0) || (!Number.isInteger(price))) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Price must be an integer' });
    }
    if (typeof quantity !== 'number') {
      return res.status(400).json({ error: 'Invalid Request', message: 'Quantity must be a integer' });
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
    if (address === new RegExp('/[^a-z]/')) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Address must be a string' });
    }
    if (!(typeof completed === 'boolean')) {
      return res.status(400).json({ error: 'Invalid Request', message: 'Completed must be a boolean' });
    }
    return next();
  }
}

export default orderValidator;
