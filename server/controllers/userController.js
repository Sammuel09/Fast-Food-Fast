import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import users from '../models/users';
import db from '../models/database';

class userController {
  static createUser(req, res) {
    const {
      username, email, phone, address, password,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(`SELECT username, email from users WHERE username = '${username}' OR email = '${email}'`)
      .then((data) => {
        if (data.rows[0].username || data.rows[0].email) {
          res.status(409).json({
            message: 'User already exists',
          });
        }
      })
      .catch(err => console.error(err.stack));

    const text = 'INSERT INTO users(username, email, phonenumber, address, password) VALUES($1, $2, $3, $4, $5)  RETURNING *';
    const values = [
      username, email, phone, address, hashedPassword,
    ];
    db.query(text, values)
      .then((data) => {
        const token = jwt.sign({ sub: data.rows[0].user_id, isAdmin: data.rows[0].usertype }, config.SECRET, {
          expiresIn: 86400,
        });
        res.status(201)
          .json({
            token,
            status: 'success',
            data: data.rows[0],
            message: 'Inserted a new user',
          });
      })
      .catch(err => console.error(err.stack));
  }
}

export default userController;
