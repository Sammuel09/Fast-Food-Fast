import express from 'express';
import bodyParser from 'body-parser';
import db from '../models/database';


class orderController {
  static createOrder(req, res) {
    const {
      userId, menuId, quantity, instruction,
    } = req.body;
    const queryText = 'INSERT INTO orders(user_id, menu_id, quantity, deliveryinstruction) VALUES($1, $2, $3, $4)  RETURNING *';
    const values = [
      userId, menuId, quantity, instruction,
    ];
    db.query(queryText, values)
      .then((data) => {
        res.status(201)
          .json({
            status: 'success',
            data: data.rows[0],
            message: 'Inserted a new order',
          });
      })
      .catch(err => console.error(err.stack));
  }

  static getAllOrders(req, res) {
    const queryText = `SELECT 
    username, phonenumber, email, address, name, price, order_id, quantity, deliveryinstruction, orderdate 
    FROM users 
    INNER JOIN orders ON orders.user_id = users.user_id
    INNER JOIN menu ON orders.menu_id = menu.menu_id`;

    db.query(queryText)
      .then((data) => {
        res.status(200)
          .json({
            status: 'success',
            data: data.rows,
            message: 'Retrieved all orders',
          });
      })
      .catch(err => console.error(err.stack));
  }

  static getOneOrder(req, res) {
    const queryText = `SELECT 
    username, phonenumber, email, address, name, price, order_id, quantity, deliveryinstruction, orderdate 
    FROM users 
    INNER JOIN orders ON orders.user_id = users.user_id
    INNER JOIN menu ON orders.menu_id = menu.menu_id
    WHERE order_id = '${req.params.id}'`;

    db.query(queryText)
      .then((data) => {
        res.status(200)
          .json({
            status: 'success',
            data: data.rows,
            message: 'Retrieved a specific order',
          });
      })
      .catch(err => console.error(err.stack));
  }
}


export default orderController;

