import dotenv from 'dotenv';

dotenv.config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_TEST: process.env.DATABASE_URL_TEST,
  SECRET: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
