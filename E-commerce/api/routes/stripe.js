const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  const { token, amount } = req.body;

  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    };
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
