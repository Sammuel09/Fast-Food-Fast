# Badges
[![Build Status](https://travis-ci.org/Sammuel09/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/Sammuel09/Fast-Food-Fast)   [![Coverage Status](https://coveralls.io/repos/github/Sammuel09/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/Sammuel09/Fast-Food-Fast?branch=develop)    [![Maintainability](https://api.codeclimate.com/v1/badges/703a7afa68a3951c6ea5/maintainability)](https://codeclimate.com/github/Sammuel09/Fast-Food-Fast/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/703a7afa68a3951c6ea5/test_coverage)](https://codeclimate.com/github/Sammuel09/Fast-Food-Fast/test_coverage) 



# Fast-Food-Fast
Fast-Food-Fast is a food delivery service app that enables user to have sweet yummy foods delivered to their door steps. The views are published on Github at https://sammuel09.github.io/Fast-Food-Fast/index.html

# Project Title
Fast-Food-Fast is a food service delivery web application.

## Getting Started
In order to have a copy of this project, clone this project to your local repository. You should have NodeJs installed on your Local machine. To start, you install the dependencies using NPM: npm install. This command installs all the dependencies this project runs on. Start the application on your localhost using the command: npm start.

## Prerequisites
You need to have NodeJs installed on yourlocal machine. Install Node here. You also need to have a working knowledge of Javascript and ES6 syntax.

### Frameworks Used
ExpressJs. Download as an npm package here

### Coding Style
This project was built using Javascript ES6. So, to transpile the ES6 code to ES5, you need to install BabelJS an NPM package.

## Testing
To test, you need to install mocha, chai and chai-http. You also need to install babel-register as NPM package to transpile ES6 code on the fly for testing.

Run the test with the NPM command: npm test

## Front End Views
This app is hosted on Github Pages. The Front End views are published at https://sammuel09.github.io/Fast-Food-Fast/index.html

## BackEnd API
The Backend APIs are hosted on heroku. https://sammie-fast-food-fast.herokuapp.com/

## The API Endpoints
                                               
<table>
  <tr>
    <th>REQUEST</th>
    <th>ENDPOINT</th>
    <th>REQUEST BODY</th>
    <th>ACTION</th>
    <th>RETURNED DATA</th>
  </tr>
  <tr>
		<td>POST</td>
		<td>/api/v1/auth/signup</td>
    <td>username: string, email: string, phone: string, address: string, password: string</td>
		<td>Create A New Usert</td>
		<td>token: string, status: string, data: object, message: string</td>
	</tr>
  <tr>
		<td>POST</td>
		<td>/api/v1/auth/login</td>
		<td>email: string, password: string</td>
    <td>Logs in a returning New User</td>
    <td>token: string,status: string, data: object, message: string</td>
	</tr>
  <tr>
		<td>POST</td>
		<td>/api/v1/menu</td>
		<td>name: string, imageurl: string, price:integer</td>
    <td>Creates a new menu option</td>
		<td>status: string, data: object, message: string</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/menu</td>
		<td></td>
		<td>Gets all Menu</td>
    <td>status: string, data: array, message: string</td>
	</tr>
  <tr>
		<td>POST</td>
		<td>/api/v1/orders</td>
    <td>userId: integer, menuId: integer, quantity: integer, instruction:string</td>
		<td>Creates an order</td>
		<td>status: string, data: object, message: string</td>
	</tr>
  <tr>
		<td>GET</td>
		<td>/api/v1/orders</td>
    <td></td>
		<td>Get all orders</td>
		<td>status: string, data: array, message: string</td>
	</tr>
  <tr>
		<td>GET</td>
		<td>/api/v1/orders/:orderId</td>
		<td></td>
    <td>Get a specific order</td>
		<td>status: string, data: object, message: string</td>
	</tr>
  <tr>
		<td>PUT</td>
		<td>/api/v1/orders/:id</td>
    <td>orderStatus: string</td>
		<td>Update a specific order</td>
		<td>status: string, data: object, message: string</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/users/:userId/orders</td>
    <td></td>
		<td>Get a user's order history</td>
		<td>status: string, data: object, message: string</td>
  </tr>
</table>

## Features
This application has the following features:

   - Users can create an account and log in 
   - A user should be able to order for food.
   - The admin should be able to add, edit or delete the fast-food items 
   - The admin should be able to see a list of fast-food items 
   - The admin user should be able to do the following: 
      - See a list of orders 
      - Accept and decline orders 
      - Mark orders as completed 
   - A user should be able to see a history of ordered food 

## License
This project is licensed under the MIT License.

