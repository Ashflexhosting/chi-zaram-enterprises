import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  createAssetFile: vi.fn(),
  listAssetFiles: vi.fn(),
}));
vi.mock("./storage", () => ({ storagePut: vi.fn() }));

import { createAssetFile, listAssetFiles } from "./db";
import { appRouter } from "./routers";
import { storagePut } from "./storage";
import type { TrpcContext } from "./_core/context";

function makeContext(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "owner-open-id",
      name: "Ashflex",
      email: "owner@example.com",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("asset storage router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stores owner-uploaded image metadata after S3 storage succeeds", async () => {
    vi.mocked(storagePut).mockResolvedValue({ key: "chi-zaram/assets/gallery/palm_1234.jpg", url: "/manus-storage/chi-zaram/assets/gallery/palm_1234.jpg" });
    vi.mocked(createAssetFile).mockResolvedValue({
      storageKey: "chi-zaram/assets/gallery/palm_1234.jpg",
      url: "/manus-storage/chi-zaram/assets/gallery/palm_1234.jpg",
      fileName: "palm.jpg",
      contentType: "image/jpeg",
      sizeBytes: 5,
      category: "gallery",
      uploadedByUserId: 1,
    });

    const caller = appRouter.createCaller(makeContext("admin"));
    const result = await caller.assets.upload({
      fileName: "palm.jpg",
      contentType: "image/jpeg",
      category: "gallery",
      dataBase64: Buffer.from("hello").toString("base64"),
    });

    expect(storagePut).toHaveBeenCalledWith(expect.stringContaining("chi-zaram/assets/gallery/palm.jpg"), expect.any(Buffer), "image/jpeg");
    expect(createAssetFile).toHaveBeenCalledWith(expect.objectContaining({ fileName: "palm.jpg", category: "gallery", uploadedByUserId: 1 }));
    expect(result.url).toContain("/manus-storage/");
  });

  it("prevents non-admin users from reading asset records", async () => {
    const caller = appRouter.createCaller(makeContext("user"));
    await expect(caller.assets.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(listAssetFiles).not.toHaveBeenCalled();
  });
});
