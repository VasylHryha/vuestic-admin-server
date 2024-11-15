const express = require("express");
const pino = require("pino");

const bodyParser = require("body-parser");

const router = require("./routes/index");
const PORT = process.env.PORT || 3000;

const logger = pino();
const app = express();

app.use(require("cors")());

app.use(require("cookie-parser")());
app.use(require("compression")());

app.use(
	require("helmet")({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: false,
		crossOriginOpenerPolicy: false,
	}),
);

app.use((req, res, next) => {
	req.time = new Date(Date.now()).toString();
	logger.info(req.method, req.hostname, req.path, req.time);
	next();
});

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});
