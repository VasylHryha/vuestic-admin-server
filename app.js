const express = require('express');
const pino = require('pino');

const bodyParser = require('body-parser');
const router = require('./routes/index');
const PORT = process.env.PORT || 3000;

const logger = pino();
const app = express();

app.use((req, res, next)=> {
	req.time = new Date(Date.now()).toString();
	logger.info(req.method, req.hostname, req.path, req.time);
	next();
});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'https://admin-demo.vuestic.dev');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	next();
});

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
	logger.fatal(err);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	logger.fatal(err);
	process.exit(1);
});
