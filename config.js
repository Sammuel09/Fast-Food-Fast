import dotenv from 'dotenv';

dotenv.config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
};

export default config;
