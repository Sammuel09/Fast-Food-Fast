import express from 'express';
import bodyParser from 'body-parser';

class menuValidator {
  static validateMenu(req, res, next) {
    const {
      name, imageurl, price,
    } = req.body;

    const responseMessage = (error, message) => res.status(400).json({ error, message });

    if (name !== undefined) {
      if (typeof name !== 'string') {
        return responseMessage('Invalid Request', 'name has to be a string');
      }
    }

    if (name !== undefined) {
      if (name.length < 1 || name === null) {
        return responseMessage('Invalid Request. Cannot be empty string or null', 'name has to be a string');
      }
    }

    if (name !== undefined) {
      if (name.trim().length === 0) {
        return responseMessage('Invalid Request. Cannot contain white space', 'name has to be a string');
      }
    }

    if (imageurl !== undefined) {
      if (typeof imageurl !== 'string') {
        return responseMessage('Invalid Request', 'imageurl has to be a string');
      }
    }

    if (imageurl !== undefined) {
      if (imageurl.length < 1 || imageurl === null) {
        return responseMessage('Invalid Request. Cannot be empty string or null', 'imageurl has to be a string');
      }
    }

    if (imageurl !== undefined) {
      if (imageurl.trim().length === 0) {
        return responseMessage('Invalid Request. Cannot contain white space', 'imageurl has to be a string');
      }
    }
    
    if ((Number(price) !== parseInt(price, 10))) {
      return responseMessage('Invalid Request', 'Price has to be a number');
    }
    return next();
  }
}

export default menuValidator;
