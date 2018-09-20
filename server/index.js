import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';
import orderRoute from './routes/orderRoute'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/v1", orderRoute);

app.get('/', (req, res) => {
	res.send('Fast Food App');
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server started on PORT ${port}..`);
});

module.exports = app;