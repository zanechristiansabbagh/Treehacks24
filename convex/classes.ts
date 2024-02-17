import { query } from "./_generated/server";
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
