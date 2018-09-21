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
  res.status(201).json({ message: 'order created successfully', order });
};


const viewAll = (req, res) => {
  res.status(200).json({ message: 'Request was succesful', orders });
};


const view = (req, res) => {
  const order = orders.find(e => e.id === parseInt(req.params.id));

  if (!(order)) {
    res.status(404).json({ error: 'Resource not found', message: 'The Order with the given ID was not found' });
    return;
  }
  res.status(200).json({ message: 'Request was succesful', order });
};

const update = (req, res) => {
  const order = orders.find(e => e.id === parseInt(req.params.id));

  if (!(order)) {
    res.status(404).json({ error: 'Resource not found', message: 'The Order with the given ID was not found' });
    return;
  }
  order.completed = req.body.completed;
  res.status(200).json({ message: 'Request was succesful', order });
};


const remove = (req, res) => {
  const order = orders.find(e => e.id === parseInt(req.params.id));

  if (!(order)) {
    res.status(404).json({ error: 'Resource not found', message: 'The Order with the given ID was not found' });
    return;
  }
  const index = orders.indexOf(order);
  orders.splice(index, 1);

  res.status(200).json({ message: 'Resource was successfully deleted' });
};

module.exports = {
  viewAll,
  view,
  create,
  update,
  remove,
};
