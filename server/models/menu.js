import pool from './database';

const menu = `CREATE TABLE menu
( menu_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  imageurl VARCHAR(100) UNIQUE NOT NULL,
  price INT UNIQUE NOT NULL
)`;

export default menu;
