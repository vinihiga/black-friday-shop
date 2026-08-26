import { describe, it, expect } from "vitest";
import {
  PaymentMethod,
  type PaymentInfoRequest,
} from "./PaymentInfoRequest.ts";

describe("PaymentInfoRequest DTO", () => {
  describe("PaymentMethod", () => {
    it("should define all expected payment method constants", () => {
      expect(PaymentMethod.CREDIT_CARD).toBe("credit_card");
      expect(PaymentMethod.DEBIT_CARD).toBe("debit_card");
      expect(PaymentMethod.PIX).toBe("pix");
      expect(PaymentMethod.PAYMENT_SLIP).toBe("payment_slip");
    });

    it("should contain all expected payment method values", () => {
      const values = Object.values(PaymentMethod);
      expect(values).toEqual(["credit_card", "debit_card", "pix", "payment_slip"]);
      expect(values).toHaveLength(4);
    });
  });

  describe("PaymentInfoRequest interface", () => {
    it("should instantiate a valid PaymentInfoRequest object with credit_card", () => {
      const paymentInfo: PaymentInfoRequest = {
        partialAmount: 50.0,
        totalAmount: 100.0,
        installments: 2,
        method: PaymentMethod.CREDIT_CARD,
      };

      expect(paymentInfo.partialAmount).toBe(50.0);
      expect(paymentInfo.totalAmount).toBe(100.0);
      expect(paymentInfo.installments).toBe(2);
      expect(paymentInfo.method).toBe("credit_card");
    });

    it("should instantiate a valid PaymentInfoRequest object with pix", () => {
      const paymentInfo: PaymentInfoRequest = {
        partialAmount: 150.0,
        totalAmount: 150.0,
        installments: 1,
        method: PaymentMethod.PIX,
      };

      expect(paymentInfo.partialAmount).toBe(150.0);
      expect(paymentInfo.totalAmount).toBe(150.0);
      expect(paymentInfo.installments).toBe(1);
      expect(paymentInfo.method).toBe(PaymentMethod.PIX);
    });
  });
});
