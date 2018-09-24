import express from 'express';
import bodyParser from 'body-parser';
import orderRoute from './routes/orderRoute';
import db from './models/database';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', orderRoute);

app.get('/api/v1', (req, res) => {
  res.status(200).json({ message: 'Welcome to Fast Food App' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on PORT ${port}..`);
});

module.exports = app;
