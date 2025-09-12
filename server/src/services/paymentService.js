/**
 * Integrate Stripe or Razorpay here later.
 * For now we simulate a payment flow via paymentController.
 */
module.exports = {
  createPaymentIntent: async (amount, currency, metadata = {}) => {
    // Later: call Stripe and return client_secret & id
    return { clientSecret: "SIMULATED_CLIENT_SECRET", id: "simulated_intent_id" };
  },
  capturePayment: async (paymentIntentId) => {
    return { status: "succeeded" };
  }
};
