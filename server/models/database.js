import { Pool } from 'pg';
import config from '../../config';

const connectionString = config.DATABASE_URL;

const db = new Pool({
  connectionString,
});

export default db;
