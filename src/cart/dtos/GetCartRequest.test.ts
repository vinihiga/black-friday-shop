import { describe, it, expect } from "vitest";
import type { GetCartRequest } from "./GetCartRequest.ts";

describe("GetCartRequest DTO", () => {
  it("should create a valid GetCartRequest object", () => {
    const request: GetCartRequest = {
      id: 123,
    };

    expect(request.id).toBe(123);
    expect(typeof request.id).toBe("number");
  });
});
