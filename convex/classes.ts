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

export const getClassesByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    console.log(email, "hi!");
    const classData = await ctx.db
      .query("classes")
      .filter((q) => q.eq(q.field("teacherEmail"), email))
      .first();
    return classData?._id;
  },
});

export const getStudentInfo = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    if (email == null) {
      return null;
    }
    const studentsInfo = await ctx.db
      .query("classes")
      .filter((q) => q.eq(q.field("teacherEmail"), email))
      .first()
      .then((classData) => classData?.students || []);
    const studentsDetails = await Promise.all(
      studentsInfo.map(async (studentId: string) => {
        return await ctx.db
          .query("students")
          .filter((q) => q.eq(q.field("_id"), studentId))
          .collect();
      })
    );
    const enhancedStudentsDetails = await Promise.all(
      studentsDetails.map(async (student) => {
        if (student.length > 0) {
          const studentId = student[0]._id;
          const totalQuestionsAnswered = await ctx.db
            .query("studentResponses")
            .filter((q) => q.eq(q.field("student"), studentId))
            .collect();
          const totalProblems = await ctx.db
            .query("problems")
            .filter((q) => q.eq(q.field("teacher"), email))
            .collect();
          return {
            ...student[0],
            cumulativeQuestions:
              totalQuestionsAnswered.length / totalProblems.length,
          };
        }
        return student;
      })
    );
    return enhancedStudentsDetails;
  },
});

export const createNewClassIfNotExists = mutation({
  args: { teacherEmail: v.string() },
  handler: async (ctx, { teacherEmail }) => {
    if (
      await ctx.db
        .query("classes")
        .filter((q) => q.eq(q.field("teacherEmail"), teacherEmail))
        .first()
    ) {
      return;
    }
    const classId = await ctx.db.insert("classes", {
      teacherEmail: teacherEmail,
      students: [],
      lectures: [],
    });
    return classId;
  },
});

export const addStudentToClass = mutation({
  args: { studentId: v.id("students"), teacherEmail: v.string() },
  handler: async (ctx, { studentId, teacherEmail }) => {
    const school = await ctx.db
      .query("classes")
      .filter((q) => q.eq(q.field("teacherEmail"), teacherEmail))
      .first();
    if (school.students.includes(studentId)) {
      console.log("Already in class");
      return;
    }
    await ctx.db.patch(school._id, {
      students: [...school.students, studentId],
    });
  },
});
