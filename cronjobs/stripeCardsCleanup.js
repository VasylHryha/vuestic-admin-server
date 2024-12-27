const Stripe = require("stripe");


async function cleanUpPaymentMethods(customerId) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: '2022-11-15'
	});
	const cutoffDate = new Date('2025-01-01T00:00:00Z'); // Replace with your desired cutoff date
	const cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000); // Convert to Unix timestamp

	try {
		// Retrieve all card payment methods for the customer
		const paymentMethods = await stripe.paymentMethods.list({
			customer: customerId,
			type: 'card',
			limit: 100,
		});

		// Detach payment methods created after the cutoff date
		for (const method of paymentMethods.data) {
			if (method.created > cutoffTimestamp) {
				await stripe.paymentMethods.detach(method.id);
				console.log(`Detached payment method: ${method.id}`);
			}
		}

		console.log('Cleanup complete.');
	} catch (error) {
		console.error('Error during payment method cleanup:', error);
	}
}

module.exports = cleanUpPaymentMethods;
