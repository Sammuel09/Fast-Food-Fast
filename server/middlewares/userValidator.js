import express from 'express';
import bodyParser from 'body-parser';

class userValidator {
  static validateUser(req, res, next) {
    const {
      username, email, phone, address, password,
    } = req.body;

    const responseMessage = (error, message) => {
      return res.status(400).json({ error, message });
    };

    if (typeof username !== 'string') {
      responseMessage('Invalid Request', 'Username has to be a string');
    }
    if (username.length < 1 || username === null) {
      responseMessage('Invalid Request. Cannot be an empty string or null', 'Username has to be a string');
    }
    if (typeof email !== 'string') {
      responseMessage('Invalid Request', 'email has to be a string');
    }
    if (typeof parseInt(phone, 10) !== 'number') {
      responseMessage('Invalid Request', 'Phone Number has to be a number');
    }
    if (typeof address !== 'string') {
      responseMessage('Invalid Request', 'Address has to be a string');
    }
    if (address.length < 1 || address === null) {
      responseMessage('Invalid Request', 'Address cannot be empty');
    }
    if (password.length < 1 || address === null) {
      responseMessage('Invalid Request', 'Password cannot be empty');
    }
    return next();
  }
}

export default userValidator;
