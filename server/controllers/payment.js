import Stripe from "stripe";
import { config } from "dotenv";

config();
//add your secret key here which you will get from stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { v4 as uuidv4 } from "uuid";

export const paymentController = (req, res, next) => {
  const { totalPrice, token } = req.body;
  //generating a unqiue id
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({ email: token.email, source: token.id })
    .then((customer) => {
      stripe.charges
        .create(
          {
            //multiplying amount with 100 because amount is in cents
            amount: totalPrice * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase on BookMania Shop`,
          },
          {
            idempotencyKey,
          }
        )
        .then((result) => res.status(200).json(result))
        .catch((error) => {
          return res.status(500).json("Something went wrong! Please try again");
        });
    });
};
