import express from 'express';
import bodyParser from 'body-parser';
import orders from '../models/model';

const create = (req, res) => {
  const order = {
    id: orders.length + 1,
    fooditem: req.body.fooditem,
    price: req.body.price,
    quantity: req.body.quantity,
    address: req.body.address,
    completed: req.body.completed,
  };

  orders.push(order);
  res.status(201).json({ message: 'Order created successfully', order });
};


const viewAll = (req, res) => {
  res.status(200).json({ message: 'Request was succesful', orders });
};


const viewOne = (req, res) => {
  const order = req.body.order;
  res.status(200).json({ message: 'Request was succesful', order });
};


const update = (req, res) => {
  const order = req.body;
  order.completed = req.body.completed;
  res.status(200).json({ message: 'Request was succesful', order });
};


const remove = (req, res) => {
  const order = req.body;
  const index = orders.indexOf(order);
  orders.splice(index, 1);

  res.status(200).json({ message: 'Order was successfully deleted' });
};

module.exports = {
  viewAll,
  viewOne,
  create,
  update,
  remove,
};
