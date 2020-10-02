const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const port = process.env.port || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3001',
    exposedHeaders: true, 
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    exposedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    "preflightContinue": false,
}))

const apiRouter = require('./router/apiRouter');
app.use('/api', apiRouter);

const { handleErrors } = require('./middlewares/Middleware');
app.use(handleErrors);

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
