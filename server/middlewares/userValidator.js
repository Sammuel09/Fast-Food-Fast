import express from 'express';
import bodyParser from 'body-parser';

class userValidator {
  static validateFirstTimeUser(req, res, next) {
    const {
      username, email, phone, address, password,
    } = req.body;

    const responseMessage = (error, message) => res.status(400).json({ error, message });

    if (typeof username !== 'string') {
      return responseMessage('Invalid Request', 'Username has to be a string');
    }

    if (username.length < 1 || username === null) {
      return responseMessage('Invalid Request. Cannot be empty string or null', 'Username has to be a string');
    }

    if (username.trim().length === 0) {
      return responseMessage('Invalid Request. Cannot contain white space', 'Username has to be a string');
    }

    if (typeof email !== 'string') {
      return responseMessage('Invalid Request', 'Email has to be a string');
    }
    if ((Number(phone) !== parseInt(phone, 10))) {
      return responseMessage('Invalid Request', 'Phone Number has to be a number');
    }
    if (typeof address !== 'string') {
      return responseMessage('Invalid Request', 'Address has to be a string');
    }
    if (address.length < 1 || address === null) {
      return responseMessage('Invalid Request', 'Address cannot be empty');
    }
    if (address.trim().length === 0) {
      return responseMessage('Invalid Request. Cannot contain white space', 'Address has to be a string');
    }

    if (typeof password !== 'string') {
      return responseMessage('Invalid Request', 'Password has to be a string');
    }

    if (password.length < 1 || password === null) {
      return responseMessage('Invalid Request', 'Password cannot be empty');
    }

    if (password.trim().length === 0) {
      return responseMessage('Invalid Request. Cannot contain white space', 'Password has to be a string');
    }
    return next();
  }

  static validateReturningUser(req, res, next) {
    const {
      email, password,
    } = req.body;

    const responseMessage = (error, message) => res.status(400).json({ error, message });
    if (typeof email !== 'string') {
      return responseMessage('Invalid Request', 'email has to be a string');
    }

    if (typeof password !== 'string') {
      return responseMessage('Invalid Request', 'Password has to be a string');
    }

    if (password.length < 1 || password === null) {
      return responseMessage('Invalid Request', 'Password cannot be empty');
    }
    
    if (password.trim().length === 0) {
      return responseMessage('Invalid Request. Cannot contain white space', 'Password has to be a string');
    }
    return next();
  }
}

export default userValidator;
