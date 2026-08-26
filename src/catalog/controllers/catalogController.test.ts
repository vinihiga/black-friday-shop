import { describe, it, expect, vi } from "vitest";
import type { Request, Response } from "express";
import { updateStock } from "./catalogController.ts";

const mockResponse = () => {
  const res = {} as unknown as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe("catalogController", () => {
  describe("updateStock", () => {
    it("should return 200 status code", async () => {
      const req = {} as Request;
      const res = mockResponse();

      await updateStock(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
