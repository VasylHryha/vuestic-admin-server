const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe('process.env.STRIPE_SECRET_KEY', {
	apiVersion: '2020-08-27',
});

router.post('/create-session', async (req, res) => {
	const { amount = 500, product = 'test', quantity = 1 } = req.body;

	// Validate that amount, product, and quantity are provided in the request
	if (!amount || !product || !quantity) {
		return res.status(400).json({ error: 'Amount, product, and quantity are required.' });
	}

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: product,
						},
						unit_amount: amount, // Amount should be in cents, e.g., $50 = 5000
					},
					quantity: quantity,
				},
			],
			mode: 'payment',
			success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${req.headers.origin}/cancel`,
		});

		res.json({ id: session.id });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
