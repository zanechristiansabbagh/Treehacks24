import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("Users").collect();
  },
});

// export const getTask = query({
//   args: {},
//   handler: async (ctx, args) => {
//     const profID = await ctx.db.get(args.taskId);
//     return profID;
//   },
// });

// import { query } from "./_generated/server";

// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.db.query("users").collect();
//   },
// });
