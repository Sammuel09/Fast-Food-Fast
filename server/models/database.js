import { Pool } from 'pg';
import config from '../../config';

let connectionString = null;

if (config.NODE_ENV === 'test') {
  connectionString = config.DATABASE_URL_TEST;
} else {
  connectionString = config.DATABASE_URL;
}

const db = new Pool({
  connectionString,
});

export default db;
