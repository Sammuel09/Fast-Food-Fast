import pool from './database';

const orders = `CREATE TABLE orders
( order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  menu_id INTEGER REFERENCES menu(menu_id),
  quantity INTEGER UNIQUE NOT NULL,
  deliveryinstruction VARCHAR UNIQUE NOT NULL,
  status VARCHAR DEFAULT New,
  orderdate TIMESTAMP NOT NULL
)`;


export default orders;
