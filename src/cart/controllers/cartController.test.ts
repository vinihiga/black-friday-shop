import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import { getCart, payCart } from "./cartController.ts";
import { prisma } from "../../shared/lib/prisma.ts";
import * as catalogServices from "../services/catalogServices.ts";

vi.mock("../../shared/lib/prisma.ts", () => ({
  prisma: {
    cart: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("../services/catalogServices.ts", () => ({
  updateCatalog: vi.fn(),
}));

const mockResponse = () => {
  const res = {} as unknown as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe("cartController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("getCart", () => {
    it("should return 200 with cart total when cart is found", async () => {
      const req = {
        body: { id: 1 },
      } as Request;
      const res = mockResponse();

      vi.mocked(prisma.cart.findUnique).mockResolvedValue({
        id: BigInt(1),
        total: 250.5,
      } as any);

      await getCart(req, res);

      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { id: BigInt(1) },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ total: 250.5 });
    });

    it("should return 404 when cart is not found", async () => {
      const req = {
        body: { id: 999 },
      } as Request;
      const res = mockResponse();

      vi.mocked(prisma.cart.findUnique).mockResolvedValue(null);

      await getCart(req, res);

      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { id: BigInt(999) },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 400 when id is missing or NaN", async () => {
      const req = {
        body: { id: "not-a-number" },
      } as Request;
      const res = mockResponse();

      await getCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalled();
      expect(prisma.cart.findUnique).not.toHaveBeenCalled();
    });

    it("should return 400 when body is undefined", async () => {
      const req = {} as Request;
      const res = mockResponse();

      await getCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalled();
      expect(prisma.cart.findUnique).not.toHaveBeenCalled();
    });

    it("should return 500 when database operation fails", async () => {
      const req = {
        body: { id: 1 },
      } as Request;
      const res = mockResponse();

      vi.mocked(prisma.cart.findUnique).mockRejectedValue(
        new Error("Database connection lost"),
      );

      await getCart(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe("payCart", () => {
    it.each([
      ["credit_card"],
      ["debit_card"],
      ["pix"],
      ["payment_slip"],
    ])("should return 200 when payment info is valid with method '%s'", async (method) => {
      const req = {
        body: {
          partialAmount: 50,
          totalAmount: 100,
          installments: 2,
          method,
        },
      } as Request;
      const res = mockResponse();

      vi.mocked(catalogServices.updateCatalog).mockResolvedValue(true);

      await payCart(req, res);

      expect(catalogServices.updateCatalog).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 400 when method is invalid", async () => {
      const req = {
        body: {
          partialAmount: 50,
          totalAmount: 100,
          installments: 1,
          method: "bitcoin",
        },
      } as Request;
      const res = mockResponse();

      await payCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalled();
      expect(catalogServices.updateCatalog).not.toHaveBeenCalled();
    });

    it("should return 400 when method is missing", async () => {
      const req = {
        body: {
          partialAmount: 50,
          totalAmount: 100,
          installments: 1,
        },
      } as Request;
      const res = mockResponse();

      await payCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalled();
      expect(catalogServices.updateCatalog).not.toHaveBeenCalled();
    });

    it("should return 400 when req.body is undefined", async () => {
      const req = {} as Request;
      const res = mockResponse();

      await payCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 500 when updateCatalog fails", async () => {
      const req = {
        body: {
          partialAmount: 100,
          totalAmount: 100,
          installments: 1,
          method: "pix",
        },
      } as Request;
      const res = mockResponse();

      vi.mocked(catalogServices.updateCatalog).mockResolvedValue(false);

      await payCart(req, res);

      expect(catalogServices.updateCatalog).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
