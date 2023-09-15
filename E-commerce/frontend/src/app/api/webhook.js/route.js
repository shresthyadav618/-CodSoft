
import { connect } from "@/dbConfig/dbConfig";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
export async function POST(req){
await connect();
const body = await req.text();
console.log('THE BODY IS : ',body);
const endpointSecret = "whsec_98529449bb0ed30a7fd9e01d6fb4ef8b8ac250ad78481bb62101fee4f19163fc";
// whsec_98529449bb0ed30a7fd9e01d6fb4ef8b8ac250ad78481bb62101fee4f19163fc
// const sig = req.headers['stripe-signature'];
const sig = headers().get('stripe-signature');
// const reqBody = await NextRequest.json();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log('THE VALUE OF ERROR IS : ',err);
    return NextResponse.json({
        statusCode: 400,
        body: err.message
    })
  }
  // Handle the event
  console.log('the event type is : ',event.type);
  console.log('the event is',event);
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentIntentSucceeded = event.data.object;
      console.log('THE VLUE OF PAYMENTINTENT SUCCEDDEDDDD - - - -- - - - - - --  ',paymentIntentSucceeded)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

// export const config = {
//     api : {bodyParser: false}
// }