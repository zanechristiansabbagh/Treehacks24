// @ts-nocheck
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
    // const user = await ctx.auth.getUserIdentity();
    return await ctx.storage.generateUploadUrl();
    // Return an upload URL
  },
});

export const saveStorageId = mutation({
  // You can customize these as you like
  args: {
    lectureId: v.optional(v.string("_storage")),
    userId: v.optional(v.string("_userID")),
    // other args...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
    console.log(args.lectureId);
    const pdfUrl = await ctx.storage.getUrl(args.lectureId);
    // Check if lectureId is provided before saving
    if (args.lectureId) {
      // Save the storageId to the database using `insert`
      ctx.db.insert("lectures", {
        lectureId: args.lectureId,
        url: pdfUrl,
        teacher: args.userId,
        students: [],
        // ...
      });
    }
  },
});
