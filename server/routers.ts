import { COOKIE_NAME } from "@shared/const";
import { assetCategories } from "../drizzle/schema";
import { createAssetFile, listAssetFiles } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { z } from "zod";

const MAX_ASSET_BYTES = 8 * 1024 * 1024;
const allowedAssetContentTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const assetUploadInput = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(allowedAssetContentTypes),
  category: z.enum(assetCategories),
  dataBase64: z.string().min(4).max(12_000_000),
});

function makeSafeFileName(fileName: string) {
  const safe = fileName
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return safe || "asset";
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  assets: router({
    list: adminProcedure.query(() => listAssetFiles()),
    upload: adminProcedure.input(assetUploadInput).mutation(async ({ ctx, input }) => {
      const fileBuffer = Buffer.from(input.dataBase64, "base64");
      if (fileBuffer.length === 0 || fileBuffer.length > MAX_ASSET_BYTES) {
        throw new Error("Files must be between 1 byte and 8 MB.");
      }

      const { key, url } = await storagePut(
        `chi-zaram/assets/${input.category}/${makeSafeFileName(input.fileName)}`,
        fileBuffer,
        input.contentType,
      );

      const asset = await createAssetFile({
        storageKey: key,
        url,
        fileName: input.fileName,
        contentType: input.contentType,
        sizeBytes: fileBuffer.length,
        category: input.category,
        uploadedByUserId: ctx.user.id,
      });

      return asset;
    }),
  }),
});

export type AppRouter = typeof appRouter;
