import type { Request, Response } from "express";
import type { PaymentInfoRequest } from "../dtos/PaymentInfoRequest.ts";

export const getCart = (req: Request, res: Response) => {
  res.json({
    total: 1.0,
  });
};

export const payCart = (req: Request, res: Response) => {
  const { partialAmount, totalAmount, installments, method } = req.body;
  const validMethods = ["credit_card", "debit_card", "pix", "payment_slip"];

  if (
    typeof partialAmount !== "number" ||
    typeof totalAmount !== "number" ||
    typeof installments !== "number" ||
    !validMethods.includes(method)
  ) {
    return res.status(400).send();
  }

  const paymentData: PaymentInfoRequest = {
    partialAmount,
    totalAmount,
    installments,
    method,
  };

  // TODO: Do something here....

  return res.status(200).send();
};
