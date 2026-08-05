import type { Request, Response } from "express";
import {
  PaymentMethod,
  type PaymentInfoRequest,
} from "../dtos/PaymentInfoRequest.ts";
import { prisma } from "../lib/prisma.ts";

export const getCart = async (req: Request, res: Response) => {
  let id: number;

  try {
    id = Number(req.body.id);
    if (isNaN(id)) {
      return res.status(400).send();
    }
  } catch {
    return res.status(400).send();
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: {
        id: BigInt(id),
      },
    });

    if (!cart) {
      return res.status(404).send();
    }

    return res.status(200).send({
      total: Number(cart.total),
    });
  } catch (error) {
    console.error("[ERROR] Failed to fetch cart:", error);
    return res.status(500).send();
  }
};

export const payCart = async (req: Request, res: Response) => {
  let partialAmount: number;
  let totalAmount: number;
  let installments: number;
  let method: PaymentMethod | undefined;

  try {
    partialAmount = Number(req.body.partialAmount);
    totalAmount = Number(req.body.totalAmount);
    installments = Number(req.body.installments);
  } catch {
    return res.status(400).send();
  }

  method = Object.values(PaymentMethod).includes(req.body.method)
    ? (req.body.method as PaymentMethod)
    : undefined;

  if (method == undefined) {
    return res.status(400).send();
  }

  const paymentData: PaymentInfoRequest = {
    partialAmount,
    totalAmount,
    installments,
    method,
  };

  // TODO: Implement payment processing logic using Prisma transactions or records as needed

  return res.status(200).send();
};
