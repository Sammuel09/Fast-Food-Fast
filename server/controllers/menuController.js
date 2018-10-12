import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import users from '../models/createTables';
import db from '../models/database';

class menuController {
  static createMenu(req, res) {
    const {
      name, imageurl, price,
    } = req.body;
    const text = 'INSERT INTO menu (name, imageurl, price ) VALUES($1, $2, $3)  RETURNING *';
    const values = [name, imageurl, price];
    db.query(text, values)
      .then((data) => {
        res.status(201)
          .json({
            status: 'success',
            data: data.rows[0],
            message: 'Inserted a new menu',
          });
      })
      .catch(err => console.error(err.stack));
  }

  static getAllMenu(req, res) {
    const text = 'SELECT menu_id, name, imageurl, price FROM menu';
    db.query(text)
      .then((data) => {
        res.status(200)
          .json({
            status: 'success',
            data: data.rows,
            message: `Retrieved all ${data.rowCount} menu`,
          });
      })
      .catch(err => console.error(err.stack));
  }
}

export default menuController;
