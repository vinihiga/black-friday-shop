export const PaymentMethod = {
  CREDIT_CARD: "credit_card",
  DEBIT_CARD: "debit_card",
  PIX: "pix",
  PAYMENT_SLIP: "payment_slip",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export type PaymentInfoRequest = {
  partialAmount: number;
  totalAmount: number;
  installments: number;
  method: PaymentMethod;
};
