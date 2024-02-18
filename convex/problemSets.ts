import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { lectureId: v.id("_storage") },
  handler: async (ctx, { lectureId }) => {
    return await ctx.db
      .query("problemSets")
      .filter((q) => q.eq(q.field("lectureId"), lectureId))
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
