const secret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secret);

exports.paymentConfirmation = async (req, res, next) => {
  try {
    const service = req.body;
    const price = service.price;
    const amount = price * 10;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json({
      status: "success",
      message: "Payment successful",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Payment unsuccessful an error occurred",
      error: error.message,
    });
  }
};
