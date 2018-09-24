import db from './database';

const users = `CREATE TABLE IF NOT EXISTS users
( user_id SERIAL PRIMARY KEY, 
  username VARCHAR(30) UNIQUE NOT NULL,
  phonenumber INT NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL, 
  address VARCHAR (300) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  usertype VARCHAR DEFAULT User
)`;

export default users;
