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

export const getClassesByEmail =  query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    console.log(email, "hi!")
    const classData =  await ctx.db
      .query("classes")
      .filter((q) => q.eq(q.field("teacherEmail"), email))
      .first();
      return classData?._id;
  },
})

export const createNewClassIfNotExists = mutation({
  args: { teacherEmail: v.string() },
  handler: async (ctx, { teacherEmail }) => {
    if(await ctx.db.query("classes").filter((q) => q.eq(q.field("teacherEmail"), teacherEmail)).first()){
        return
    }
    const classId = await ctx.db.insert("classes",{ teacherEmail: teacherEmail, students: [], lectures: []})
    return classId;
  },
})

export const addStudentToClass = mutation({
  args: { studentId: v.id("students"), teacherEmail: v.string() },
  handler: async (ctx, { studentId, teacherEmail }) => {
    const school = await ctx.db.query("classes").filter((q) => q.eq(q.field("teacherEmail"), teacherEmail)).first()
    console.log(school)
    const classId = school._id
    console.log(classId)
    const currentStudents = await ctx.db.get(classId)
    console.log(currentStudents)
    if(currentStudents.includes(studentId)){
        console.log("Already in class")
        return
    }
    await ctx.db.patch(classId, { students: [...currentStudents, studentId] })
  },
})
