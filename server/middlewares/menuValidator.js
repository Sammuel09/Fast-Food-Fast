import express from 'express';
import bodyParser from 'body-parser';

class menuValidator {
  static validateMenu(req, res, next) {
    const {
      name, imageurl, price,
    } = req.body;

    const responseMessage = (error, message) => res.status(400).json({ error, message });

    if (typeof name !== 'string') {
      responseMessage('Invalid Request', 'name has to be a string');
    }
    if (name !== undefined) {
      if (name.length < 1 || name === null) {
        responseMessage('Invalid Request. Cannot be an empty string or nulll', 'name has to be a string');
      }
    }

    if (name.trim().length < 1) {
      responseMessage('Invalid Request. Cannot be white space', 'name has to be a string');
    }

    if (typeof imageurl !== 'string') {
      responseMessage('Invalid Request', 'imageurl has to be a string');
    }
    if (imageurl !== undefined) {
      if (imageurl.length < 1 || imageurl === null) {
        responseMessage('Invalid Request. Cannot be an empty string or nulll', 'imageurl has to be a string');
      }
    }
    if (imageurl.trim().length < 1) {
      responseMessage('Invalid Request. Cannot be white space', 'imageurl has to be a string');
    }
    if ((Number(price) !== parseInt(price, 10))) {
      responseMessage('Invalid Request', 'Price has to be a number');
    }
    return next();
  }
}

export default menuValidator;
