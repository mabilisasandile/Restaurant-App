
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
    'sk_test_51O0LfwH0Oo7ShsJ8CiYi8iOcRrUFbZkFWtFs0vg8vyDZYQu8yWP886LXTh5bBhLAUxGCJQrRLbIhHCXsd9HVsU1i00Aa15c6A1'
);

// router endpoints
router.post('/intents', async (req, res) => {
    try {
        // create paymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            automatic_payment_methods: {
                enable: true,
            }
        });
        // return the secret
        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
});


module.exports = router;

