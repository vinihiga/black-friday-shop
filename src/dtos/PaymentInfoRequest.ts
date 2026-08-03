export type PaymentInfoRequest = {
  partialAmount: number;
  totalAmount: number;
  installments: number;
  method: "credit_card" | "debit_card" | "pix" | "payment_slip";
};
