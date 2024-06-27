import { Request, Response, query } from "express";
import Stripe from "stripe";
import catchAsync from "../../../shared/catchAsync";
import { PaymentModel } from "./payment.model";

// Create a new instance of the Stripe class
const STRIPE_SECRET_KEY = process.env.STRIPE_SEC_KEY as string;
const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUB_KEY as string;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  typescript: true,
});

export const generateResponse = (
  intent: Stripe.PaymentIntent
):
  | {
      clientSecret: string | null;
      requiresAction: boolean;
      status: string;
    }
  | { clientSecret: string | null; status: string }
  | { error: string } => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case "requires_action":
      // Card requires authentication
      return {
        clientSecret: intent.client_secret,
        requiresAction: true,
        status: intent.status,
      };
    case "requires_payment_method":
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: "Your card was denied, please provide a new payment method",
      };
    case "succeeded":
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
      console.log("Payment Received!");
      return { clientSecret: intent.client_secret, status: intent.status };
  }

  return {
    error: "Failed",
  };
};

export const payWithoutWebhook = catchAsync(
  async (req: Request, res: Response) => {
    const {
      paymentMethodId,
      paymentIntentId,
      items,
      currency,
      useStripeSdk,
      cvcToken,
      email,
      amount,
      userId,
    }: {
      paymentMethodId?: string;
      paymentIntentId?: string;
      cvcToken?: string;
      items: any;
      currency: string;
      useStripeSdk: boolean;
      email?: string;
      amount: string;
      userId: string;
    } = req.body;

    console.log("req.body: ", req.body);

    const orderAmount: number = parseInt(amount) * 10;

    try {
      if (cvcToken && email) {
        const customers = await stripe.customers.list({
          email,
        });

        // The list all Customers endpoint can return multiple customers that share the same email address.
        // For this example we're taking the first returned customer but in a production integration
        // you should make sure that you have the right Customer.
        if (!customers.data[0]) {
          res.json({
            success: false,
            message:
              "There is no associated customer object to the provided e-mail",
            error:
              "There is no associated customer object to the provided e-mail",
          });
          return;
        }

        const paymentMethods = await stripe.paymentMethods.list({
          customer: customers.data[0].id,
          type: "card",
        });

        if (!paymentMethods.data[0]) {
          res.json({
            success: false,
            message:
              "There is no associated payment method to the provided customer's e-mail",
            error:
              "There is no associated payment method to the provided customer's e-mail",
          });
          return;
        }

        const params: Stripe.PaymentIntentCreateParams = {
          amount: orderAmount,
          confirm: true,
          confirmation_method: "manual",
          currency,
          payment_method: paymentMethods.data[0].id,
          payment_method_options: {
            card: {
              cvc_token: cvcToken,
            },
          },
          use_stripe_sdk: useStripeSdk,
          customer: customers.data[0].id,
        };

        console.log("payWithoutWebhook->params: ", params);
        const intent = await stripe.paymentIntents.create(params);

        //Start: Save to balance table here
        // this.saveBalance(userId, quantity, paymentMethodId);
        //End: Save to balance table here

        res.json({
          success: true,
          message: "Success!",
          data: generateResponse(intent),
        });
        return;
      } else if (paymentMethodId) {
        // Create new PaymentIntent with a PaymentMethod ID from the client.
        const params: Stripe.PaymentIntentCreateParams = {
          amount: orderAmount,
          confirm: true,
          confirmation_method: "manual",
          currency,
          payment_method: paymentMethodId,
          // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
          // to take advantage of new authentication features in mobile SDKs.
          use_stripe_sdk: useStripeSdk,
        };
        const intent = await stripe.paymentIntents.create(params);

        //Start: Save to balance table here
        // this.saveBalance(userId, quantity, paymentMethodId);
        //End: Save to balance table here

        // After create, if the PaymentIntent's status is succeeded, fulfill the order.
        res.json({
          success: true,
          message: "Success!",
          data: generateResponse(intent),
        });
        return;
      } else if (paymentIntentId) {
        // Confirm the PaymentIntent to finalize payment after handling a required action
        // on the client.
        const intent = await stripe.paymentIntents.confirm(paymentIntentId);

        //Start: Save to balance table here
        // this.saveBalance(userId, quantity, paymentMethodId);
        //End: Save to balance table here

        // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
        res.json({
          success: true,
          message: "Success!",
          data: generateResponse(intent),
        });
        return;
      }

      res.json({
        success: false,
        message: "Something went wrong !",
        error: "unknown",
      });
    } catch (error) {
      console.log(" error: ", error);
      res.json({
        success: false,
        message: "Something went wrong !",
        error: error,
      });
    }
  }
);

export const chargeCardOffSession = catchAsync(
  async (req: Request, res: Response) => {
    const { amount, email } = req.body;

    let paymentIntent, customer;

    try {
      // You need to attach the PaymentMethod to a Customer in order to reuse
      // Since we are using test cards, create a new Customer here
      // You would do this in your payment flow that saves cards
      customer = await stripe.customers.list({
        email,
      });

      // List the customer's payment methods to find one to charge
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer.data[0].id,
        type: "card",
      });

      // Create and confirm a PaymentIntent with the order amount, currency,
      // Customer and PaymentMethod ID
      paymentIntent = await stripe.paymentIntents.create({
        amount: 280,
        currency: "usd",
        payment_method: paymentMethods.data[0].id,
        customer: customer.data[0].id,
        off_session: true,
        confirm: true,
      });

      res.json({
        success: true,
        succeeded: true,
        clientSecret: paymentIntent.client_secret,
        publicKey: STRIPE_PUBLIC_KEY,
      });
    } catch (err: any) {
      if (err.code === "authentication_required") {
        // Bring the customer back on-session to authenticate the purchase
        // You can do this by sending an email or app notification to let them know
        // the off-session purchase failed
        // Use the PM ID and client_secret to authenticate the purchase
        // without asking your customers to re-enter their details
        res.json({
          success: false,
          error: "authentication_required",
          paymentMethod: err.raw.payment_method.id,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: STRIPE_PUBLIC_KEY,
          amount: 280,
          card: {
            brand: err.raw.payment_method.card.brand,
            last4: err.raw.payment_method.card.last4,
          },
        });
      } else if (err.code) {
        // The card was declined for other reasons (e.g. insufficient funds)
        // Bring the customer back on-session to ask them for a new payment method
        res.json({
          success: false,
          error: err.code,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: STRIPE_PUBLIC_KEY,
        });
      } else {
        console.log("Unknown error occurred", err);
      }
    }
  }
);

// export const paymentProcess = catchAsync(async (req: Request, res: Response) => {

//   try {
//     const { cardHolderName, amount, productDetails, paymentMethod } = req.body;

//     const userEmail = req.user?.email;
//     // const userEmail="tarikul.cse5.bu@gmail.com"
//     // console.log("body Data", cardHolderName, cardNumber, expMonth, expYear, cvc, amount, productDetails, userEmail)
//     // 1. Create Payment Method
//     // const paymentMethod = await stripe.paymentMethods.create({
//     //     type: 'card',
//     //     card: {
//     //         number: cardNumber,
//     //         exp_month: expMonth,
//     //         exp_year: expYear,
//     //         cvc: cvc,
//     //     },
//     // });

//     // 2. Attach Payment Method to Customer
//     const customer = await stripe.customers.create({
//       name: cardHolderName,
//       email: userEmail,
//       payment_method: paymentMethod.id,
//       invoice_settings: {
//         default_payment_method: paymentMethod.id,
//       },
//     });

//     console.log("Customer Create", customer)

//     // 3. Process Payment
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd',
//       customer: customer.id,
//       payment_method: paymentMethod.id,
//       payment_method_types: ["card"],
//       automatic_payment_methods: {
//         enabled: true
//       },
//       confirm: true,
//     });

//     console.log("PaymentIntent", paymentIntent)

//     // 3. Save Payment Details to Local Database
//     const paymentData = await PaymentModel.create({
//       name: cardHolderName,
//       email: userEmail,
//       amount: amount,
//       currency: "usd",
//       paymentMethod: "card",
//       status: "Success",
//       customer_id: customer.id,
//       payment_id: paymentIntent.id,
//       // Assuming 'exp_month' and 'exp_year' are properties of paymentMethod.card
//       expiredDate: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
//       // Assuming 'brand' is a property of paymentMethod.card
//       brand: paymentMethod.card.brand,
//       productDetails: productDetails
//     });

//     // Send success response
//     res.json({
//       success: true,
//       message: "Payment success !",
//       data: { customerID: customer.id, paymentID: paymentIntent.id }
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Payment Failed !",
//       data: error
//     });
//   }

// });

export const getAllpayment = catchAsync(async (req: Request, res: Response) => {
  try {
    // Retrieve all charges
    const charges = await stripe.charges.list({ limit: 100 }); // Adjust limit as needed

    // Retrieve all payment intents
    const paymentIntents = await stripe.paymentIntents.list({ limit: 100 }); // Adjust limit as needed

    // Combine and return payment information
    // const allPayments = [...charges.data, ...paymentIntents.data];
    // res.json({ payments: allPayments });

    // Send success response
    res.json({
      success: true,
      message: "All payments!",
      payments: paymentIntents,
      charges: charges,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong !",
      data: error,
    });
  }
});

export const getAllPayments = catchAsync(
  async (req: Request, res: Response) => {
    try {
      let { status, limit = 100, startDate, endDate }: any = req.query; // Access status filter from query string

      let paymentIntents: Stripe.PaymentIntent[]; // Declare an empty array to store filtered results

      console.log("startDate~", startDate.length);
      const allPaymentIntents = await stripe.paymentIntents.list({
        limit: +limit,
      }); // Fetch all initially

      paymentIntents = allPaymentIntents.data;
      if (status && typeof status === "string" && status.length > 2) {
        paymentIntents = allPaymentIntents.data.filter(
          (intent) => intent.status === status
        );
      }

      if (startDate && startDate !== "null" && endDate && endDate !== "null") {
        const sD: any = new Date(startDate);
        const eD: any = new Date(endDate);
        const startUnixTimestamp = sD.getTime() / 1000; // Convert milliseconds to seconds
        const endUnixTimestamp = eD.getTime() / 1000;
        paymentIntents = allPaymentIntents.data.filter(
          (intent) =>
            intent.created >= startUnixTimestamp &&
            intent.created <= endUnixTimestamp
        );
      }

      res.json({
        success: true,
        message: "All payments!",
        payments: paymentIntents,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export const getAllCustomer = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const customers = await stripe.customers.list({ limit: 100 }); // Adjust limit as needed

      res.json({
        success: true,
        message: "All payments!",
        customers: customers,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Something went wrong !",
        data: error,
      });
    }
  }
);

export const PaymentsController = {
  // createCheckoutSession
  // paymentProcess,
  getAllpayment,
  getAllCustomer,
  getAllPayments,
};
