import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { updateCatalog } from "./catalogServices.ts";

describe("catalogServices", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe("updateCatalog", () => {
    it("should send PUT request to default CATALOG_URL and return true on success", async () => {
      delete process.env.CATALOG_URL;
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
      });
      vi.stubGlobal("fetch", fetchMock);

      const result = await updateCatalog();

      expect(fetchMock).toHaveBeenCalledWith("http://catalog:3001/catalog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toBe(true);
    });

    it("should return false and log error when catalog response is not ok", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error");
      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });
      vi.stubGlobal("fetch", fetchMock);

      const result = await updateCatalog();

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[ERROR] Catalog service updateStock failed with status: ",
        500,
      );
    });

    it("should return false and log error when fetch throws a network exception", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error");
      const fetchMock = vi
        .fn()
        .mockRejectedValue(new Error("Connection refused"));
      vi.stubGlobal("fetch", fetchMock);

      const result = await updateCatalog();

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[ERROR] Catalog service is unreachable.",
      );
    });
  });
});
