import bcrypt from 'bcryptjs';
import db from './database';

const hashedPassword = bcrypt.hashSync('samuel', 10);

const createTables = `DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (user_id SERIAL PRIMARY KEY, 
  username VARCHAR(30) UNIQUE NOT NULL,
  phonenumber VARCHAR NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL, 
  address VARCHAR (300) NOT NULL,
  password VARCHAR(100) NOT NULL,
  usertype INT DEFAULT 0
);
INSERT INTO users (username, phonenumber, email, address, password, usertype) VALUES ('samuel', '08137840740', 'samuel@gmail.com', '194, Herbert Macaulay Way, Yaba', '${hashedPassword}', 1);
DROP TABLE IF EXISTS menu CASCADE;
CREATE TABLE menu ( menu_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  imageurl VARCHAR(100) NOT NULL,
  price INT NOT NULL
);
DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders ( order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON UPDATE CASCADE,
  menu_id INTEGER REFERENCES menu(menu_id) ON UPDATE CASCADE ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  deliveryinstruction VARCHAR NOT NULL,
  orderstatus status DEFAULT 'New',
  orderdate TIMESTAMP DEFAULT (NOW())
)`;

db.query(createTables)
  .then(() => {
    console.log('Table created successfully');
  })
  .catch((err) => {
    console.log(err);
  });
