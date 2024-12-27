const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const { HARD_CODED_CUSTOMER_ID } = require('../constants');

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

// Enable CORS for all routes in this router
router.use(cors()); // Allow cross-origin requests for all routes in this router

// Route to retrieve all saved payment methods for a customer
router.get('/payment-method', async (req, res) => {
	try {
		const paymentMethods = await stripe.paymentMethods.list({
			customer: HARD_CODED_CUSTOMER_ID,
			type: 'card',
		});

		res.status(200).json({
			status: 'success',
			message: 'Payment methods retrieved successfully.',
			data: paymentMethods.data,
		});
	} catch (error) {
		console.error('Error fetching payment methods:', error.message);
		res.status(500).json({
			status: 'error',
			message: 'Failed to fetch payment methods.',
			data: null,
		});
	}
});

// Route to remove a payment method
router.delete('/payment-method/:id', async (req, res) => {
	const {id} = req.params;

	try {
		await stripe.paymentMethods.detach(id);

		res.status(200).json({
			status: 'success',
			message: 'Payment method removed successfully.',
			data: {id},
		});
	} catch (error) {
		console.error('Error removing payment method:', error.message);
		res.status(500).json({
			status: 'error',
			message: 'Failed to remove payment method.',
			data: null,
		});
	}
});

// Route to attach a payment method to a customer
router.put('/payment-method', async (req, res) => {
	const {paymentMethodId} = req.body;

	if (!paymentMethodId) {
		return res.status(400).json({
			status: 'error',
			message: 'Payment Method ID is required.',
			data: null,
		});
	}

	try {
		const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
			customer: HARD_CODED_CUSTOMER_ID,
		});

		res.status(200).json({
			status: 'success',
			message: 'Payment method added successfully.',
			data: paymentMethod,
		});
	} catch (error) {
		console.error('Error adding payment method:', error.message);
		res.status(500).json({
			status: 'error',
			message: error.message,
			data: null,
		});
	}
});


router.post('/payment-intent', async (req, res) => {
	try {
		const {amount, currency, paymentMethod} = req.body
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
			customer: HARD_CODED_CUSTOMER_ID,
			payment_method: paymentMethod,
			confirm: true,
		})
		res.json(paymentIntent)
	} catch (error) {
		res.status(500).json({error: error.message})
	}
})

router.post('/payment', async (req, res) => {
	const {
		customerId = HARD_CODED_CUSTOMER_ID,
		paymentMethod,
		amount,
		currency = 'usd',
		description = 'Invoice for custom payment'
	} = req.body;

	try {
		// 1. Create and finalize the invoice
		const invoice = await stripe.invoices.create({
			customer: customerId,
			auto_advance: false, // Automatically finalize and charge this invoice
		});

		// 2. Create an invoice item
		await stripe.invoiceItems.create({
			customer: customerId,
			amount,
			currency,
			description,
			invoice: invoice.id,
		});

		// 3. Pay the invoice using the specified payment method
		const paidInvoice = await stripe.invoices.pay(invoice.id, {
			payment_method: paymentMethod,
		});


		// Respond with the invoice details
		res.status(200).json({
			status: 'success',
			message: 'Payment and invoice processed successfully.',
			data: {invoice: paidInvoice},
		});
	} catch (error) {
		console.error('Error processing payment and invoice:', error.message);
		res.status(500).json({
			status: 'error',
			message: error.message,
			data: null,
		});
	}
});


// Route to fetch invoices with pagination (10 per page)
router.get('/invoices', async (req, res) => {
	try {
		const {starting_after} = req.query; // Get the starting_after parameter from query params

		// Use Stripe's invoices.list API to retrieve the invoices
		const invoices = await stripe.invoices.list({
			customer: HARD_CODED_CUSTOMER_ID,
			limit: 10, // Get only 10 invoices per request
			starting_after: starting_after || undefined, // If starting_after is provided, use it
		});

		res.status(200).json({
			status: 'success',
			message: 'Invoices retrieved successfully.',
			data: {
				invoices: invoices.data,
				has_more: invoices.has_more, // Check if there are more invoices to paginate
			},
		});
	} catch (error) {
		console.error('Error fetching invoices:', error.message);
		res.status(500).json({
			status: 'error',
			message: error.message,
			data: null,
		});
	}
});

module.exports = router;
