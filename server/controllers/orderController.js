import express from 'express';
import bodyParser from 'body-parser';
import orders from "../models/model"
import Joi from 'joi';

const validateOrder = (order) => {
	const schema = {
		fooditem: Joi.string().min(5).required(),
		price: Joi.string().required(),
		quantity: Joi.string().required(),
		address: Joi.string().min(5).required(),
		completed: Joi.boolean()
	};

	return Joi.validate(order, schema)
};


const create = (req, res) => {
	const { error } = validateOrder(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	const order = {
		id: orders.length + 1,
		fooditem: req.body.fooditem,
		price: req.body.price,
		quantity: req.body.quantity,
		address: req.body.address,
		completed: req.body.completed
	}

	orders.push(order);
	res.status(201).send(order);
};


const viewAll = (req, res) => {
	res.status(200).send(orders);
};


const view = (req, res) => {
	const order = orders.find( e => {
			return e.id === parseInt(req.params.orderId)
		}
	);
	if (!order) {
		res.status(404).send("The Order with the given ID was not found");
		return;
	}
	res.status(200).send(order);
};

const update = (req, res) => {

	const order = orders.find( e => {
		return e.id === parseInt(req.params.orderId)
	});

	if (!order){
		res.status(404).send("The order with the given ID was not found")
		return;
	}
	const { error } = validateOrder(req.body);

	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	order.completed = req.body.completed;
	res.status(200).send(order);
}


const remove = (req, res) => {
	const order = orders.find( e => {
		return e.id === parseInt(req.params.orderId)
	});

	if (!order) {
		res.status(404).send("The Order with the given ID was not found");
		return;
	} 

	const index = orders.indexOf(order);
	orders.splice(index, 1);

	res.status(200).send(order);
}

module.exports = {
    viewAll,
    view,
    create,
    update,
    remove,
};