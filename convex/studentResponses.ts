import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getResponses = query({
  args: { problemId: v.string() },
  handler: async (ctx, { problemId }) => {
    return await ctx.db
      .query("studentResponses")
      .filter((q) => q.eq(q.field("problemId"), problemId))
      .collect();
  },
});
export const getAverageScore = query({
  args: { lectureIds: v.array(v.id("_storage")) },
  handler: async (ctx, { lectureIds }) => {
    const averages = await Promise.all(
      lectureIds.map(async (lectureId, index) => {
        console.log(lectureId);
        const responses = await ctx.db
          .query("studentResponses")
          .filter((q) => q.eq(q.field("lectureId"), lectureId))
          .collect();
        let totalScore = 0;
        responses.forEach((response) => {
          totalScore += response.score;
        });
        const averageScore =
          responses.length > 0 ? totalScore / responses.length : 0;
        return { x: index + 1, y: averageScore };
      })
    );

    return averages;
  },
});

export const getResponseScore = query({
  args: { lectureId: v.id("_storage") },
  handler: async (ctx, { lectureId }) => {
    const problemIds = await ctx.db
      .query("problems")
      .filter((q) => q.eq(q.field("lectureId"), lectureId))
      .collect();

    const responsesByProblem = await Promise.all(
      problemIds.map(async (problem) => {
        const responses = await ctx.db
          .query("studentResponses")
          .filter((q) => q.eq(q.field("problemId"), problem._id))
          .collect();
        return responses.map((response) => ({
          questionText: problem.questionText,
          solutionText: problem.solutionText,
          responseText: response.responseText,
          score: response.score,
        }));
      })
    );

    return responsesByProblem;
  },
});

export const deleteClass = mutation({
  args: { taskId: v.id("lectures"), storageId: v.id("_storage") },
  handler: async (ctx, { taskId, storageId }) => {
    await ctx.storage.delete(storageId);
    await ctx.db.delete(taskId);
  },
});
