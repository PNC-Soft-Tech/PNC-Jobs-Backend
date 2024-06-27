export interface IPayment {
    amount: number;
    currency: string;
    paymentMethod: string; // Stripe payment method ID
    status: string; // Status of the payment (e.g., succeeded, pending, failed)
    // Add other payment-related attributes as needed
  }
  