const express = require('express');
const app = express();

const port = process.env.port || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = require('./router/apiRouter');
app.use('/api', apiRouter);

const { handleErrors } = require('./middlewares/Middleware');
app.use(handleErrors);

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
