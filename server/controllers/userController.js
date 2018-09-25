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
    db.query(`SELECT username from users WHERE username = '${username}'`)
      .then((data) => {
        if (data.rowCount > 0) {
          res.status(409).json({
            message: 'Username already exists. Use a different Username',
          });
        }
      })
      .catch(err => console.error(err.stack));

    db.query(`SELECT email from users WHERE email = '${email}'`)
      .then((data) => {
        if (data.rowCount > 0) {
          res.status(409).json({
            message: 'Email already exists. Use a differen email address',
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

  static signinUser(req, res) {
    const {
      email, password,
    } = req.body;
    db.query(`SELECT * from users WHERE email = '${email}'`)
      .then((data) => {
        // console.log(data.rows[0])

        const passwordIsValid = bcrypt.compareSync(password, data.rows[0].password);
        // console.log(passwordIsValid);

        if (!passwordIsValid) {
          return res.status(401).json({ Error: 'Incorrect Password' });
        }

	      const token = jwt.sign({ userId: data[0].id }, config.SECRET, {
          expiresIn: 86400,
        });
        console.log(token);
        return res.status(200).send({ auth: true, token });
      })
      .catch(err => console.error(err.stack));
  }
}

export default userController;
