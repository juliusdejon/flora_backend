import express from 'express';
const router = express.Router();

import PaymentController from '../../controllers/PaymentController';



// @route   POST api/payment-sheet
// @desc    Initializes payment with Stripe
// @access  Public
router.post('/payment-sheet', PaymentController.pay);


export default router;
