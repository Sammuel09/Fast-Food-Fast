import { Pool } from 'pg';

const connectionString = 'postgres://kgftmxlu:Zq0jLLwiNq4vt9uXkZwCz6Lb5Kivyrrz@stampy.db.elephantsql.com:5432/kgftmxlu';

const db = new Pool({
  connectionString,
});

// const text = 'INSERT INTO menu(name,imageurl, price) VALUES($1, $2, $3) RETURNING *';
// const values = ['Eba and Egusi', 'www.facebook.com', 1000];

// db.query(text, values)
//   .then(res=>{
//     console.log(res.rows[0])
//   })
//   .catch(e => console.log(e.stack));


export default db;
