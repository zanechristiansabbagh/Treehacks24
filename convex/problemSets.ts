// @ts-nocheck
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

export const createProblemSet = mutation({
  args: {
    qaPairs: v.array(v.object({ Question: v.string(), Answer: v.string() })),
    keyWords: v.array(v.string()),
    lectureId: v.id("_storage"),
    teacher: v.string(),
  },
  handler: async (ctx, { qaPairs, keyWords, lectureId, teacher }) => {
    const problemIds = await Promise.all(
      qaPairs.map((pair) =>
        ctx.db.insert("problems", {
          responseText: pair.Answer,
          lectureId: lectureId,
          teacher: teacher,
          questionText: pair.Question,
          studentResponses: [],
        })
      )
    );
    await ctx.db.insert("problemSets", {
      problems: problemIds.map(({ _id }) => _id),
      keywords: keyWords,
      lectureId: lectureId,
    });
  },
});

export const deleteClass = mutation({
  args: { taskId: v.id("lectures"), storageId: v.id("_storage") },
  handler: async (ctx, { taskId, storageId }) => {
    await ctx.storage.delete(storageId);
    await ctx.db.delete(taskId);
  },
});
