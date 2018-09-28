import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';


class Auth {
  static verifyAuth(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403)
          .json({ error: 'Invalid Token. You are not authorised to access this page' });
      } if (decoded) {
        const { sub, isAdmin } = decoded;
        req.user = { sub, isAdmin };
      }
      return next();
    });
  }

  static verifyAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403)
          .json({ error: 'Invalid Token. You are not authorised to access this page' });
      } if (decoded) {
        const { sub, isAdmin } = decoded;
        if (isAdmin !== 1) {
          return res.status(403)
            .json({ error: 'You are not authorised to access this page. Only Admin Access' });
        } if (isAdmin === 1) {
          req.user = { sub, isAdmin };
          console.log(req.user);
        }
      }
      return next();
    });
  }
}

export default Auth;
