import express from 'express';
import bodyParser from 'body-parser';

class menuValidator {
  static validateMenu(req, res, next) {
    const {
      name, image, price 
    } = req.body;

    const responseMessage = (error, message) => {
      return res.status(400).json({ error, message });
    };

    if (typeof username !== 'string') {
      responseMessage('Invalid Request', 'Username has to be a string');
    }