const express = require('express');
const Stripe = require('stripe');
const cors = require('cors'); // Import the CORS middleware

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});

const HARD_CODED_CUSTOMER_ID = 'cus_RPmbpSyKY0cF1N'; // Hard-coded customer ID for testing purposes

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
	const { id } = req.params;

	try {
		await stripe.paymentMethods.detach(id);

		res.status(200).json({
			status: 'success',
			message: 'Payment method removed successfully.',
			data: { id },
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
	const { paymentMethodId } = req.body;

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
			message: 'Failed to add payment method.',
			data: null,
		});
	}
});

module.exports = router;
