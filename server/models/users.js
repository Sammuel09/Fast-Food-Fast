import pool from './database';

const users = `CREATE TABLE users
( user_id SERIAL PRIMARY KEY, 
  firstname VARCHAR(30) UNIQUE NOT NULL,
  lastname VARCHAR(30) UNIQUE NOT NULL,
  phonenumber INT NOT NULL,
  email VARCHAR(300) UNIQUE NOT NULL, 
  address VARCHAR (300) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  usertype VARCHAR DEFAULT User
)`;

export default users;
