const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const cleanUpPaymentMethods = require('./cronjobs/stripeCardsCleanup');
const { HARD_CODED_CUSTOMER_ID } = require('./constants');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// Your existing routes
const router = require('./routes/index');
app.use(router);

//Schedule the task to run every hour
cron.schedule('0 * * * *', () => {
	console.log('Running scheduled cleanup task...');
	cleanUpPaymentMethods(HARD_CODED_CUSTOMER_ID);
}, {
	scheduled: true, // Ensures the task starts automatically
	timezone: "UTC", // Set timezone if needed
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
