export function isPaymentMethod(method: string): method is PaymentMethod {
  return (validMethods as readonly string[]).includes(method);
}

const validMethods = [
  "credit_card",
  "debit_card",
  "pix",
  "payment_slip",
] as const;

export type PaymentMethod = (typeof validMethods)[number];

export type PaymentInfoRequest = {
  partialAmount: number;
  totalAmount: number;
  installments: number;
  method: PaymentMethod;
};
