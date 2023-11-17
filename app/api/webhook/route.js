const stripe = require("stripe")(process.env.STRIPE_SK);
import { mongooseConnect } from "@/app/lib/connectDb";
import { buffer } from "micro";

export async function POST(req) {
  //connected to database
  await mongooseConnect();

  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  const sig = req.headers.get("stripe-signature");

  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    return new Response(JSON.stringify(`Webhook Error: ${error.message}`), {
      status: 400,
    });
  }

  console.log("event type", event.type);

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log("paymentIntentSucceeded", paymentIntentSucceeded);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify("successful payment"), { status: 200 });
}

export const config = {
  api: { bodyParser: false },
};

export async function GET(req) {
  await mongooseConnect();

  try {
    return new Response(JSON.stringify("ok"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
