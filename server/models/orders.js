import db from './database';

const orders = `CREATE TABLE IF NOT EXISTS orders
( order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON UPDATE CASCADE,
  menu_id INTEGER REFERENCES menu(menu_id) ON UPDATE CASCADE ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  deliveryinstruction VARCHAR NOT NULL,
  status VARCHAR DEFAULT ('New'),
  orderdate NOW();
)`;


export default orders;
