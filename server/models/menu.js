import db from './database';

const menu = `DROP TABLE IF EXISTS menu;
CREATE TABLE menu ( menu_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  imageurl VARCHAR(100) NOT NULL,
  price INT NOT NULL
)`;
export default menu;
