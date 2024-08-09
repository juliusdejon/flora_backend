import { Request, Response } from 'express';
const stripe = require("stripe")(
  ""
);

class PaymentController {

  // pay
  async pay(req: Request, res: Response) {
    const { email, amount, currency } = req.body;
    console.log(process.env.STRIPE_API_KEY);
    console.log(process.env.STRIPE_PUBLISHABLE_API_KEY);
    try {
      let customer;
      if (email) {
        // Retrieve customer information from Stripe
        const customers = await stripe.customers.list({ email: email, limit: 1 });
        if (customers.data.length > 0) {
          customer = customers.data[0];
          console.log("Customer found:");
          console.log(customer);
        } else {
          customer = await stripe.customers.create({ email: email });
          console.log("No customer found with this email.");
        }
      } else {
        // Produce error message
        return res.status(400).json({ error: "No customer Id Provided" });
      }

 
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2023-10-16" }
      );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        customer: customer.id,
        description: "",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter
        // is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        paymentIntent: paymentIntent,
        paymentIntentClientSecret: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: `${process.env.STRIPE_PUBLISHABLE_API_KEY}`,
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ error: "Error processing payment" });
    }
  }
}

export default new PaymentController();
