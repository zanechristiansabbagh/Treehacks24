import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("lectures")
      .filter((q) => q.eq(q.field("teacher"), userId))
      .collect();
  },
});

export const deleteClass = mutation({
  args: { taskId: v.id("lectures"), storageId: v.id("_storage") },
  handler: async (ctx, { taskId, storageId }) => {
    await ctx.storage.delete(storageId);
    await ctx.db.delete(taskId);
  },
});
