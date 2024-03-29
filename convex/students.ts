import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getStudents = query({
    args: { studentId: v.id("students")  },
    handler: async (ctx, { studentId }) => {
        return await ctx.db.get(studentId)
    }
})

export const updateStudentsTextsScoreIndex = mutation({
    args: { studentId: v.id("students"), texts: v.number(), score: v.number(), index: v.number() },
    handler: async (ctx, { studentId, texts, score, index }) => {
        const currentStudent = await ctx.db.get(studentId)
        const currentScore = currentStudent.score
        const currentTexts = currentStudent.texts
        const currentIndexesSeen = currentStudent.indexesSeen
        const newIndexSeen = [...currentIndexesSeen, index]
        await ctx.db.patch(studentId, { texts: currentTexts + 1, score: currentScore + score, indexesSeen: newIndexSeen});
    },
});

export const resetStudentTextsAndScore = mutation({
    args: { studentId: v.id("students") },
    handler: async (ctx, { studentId }) => {
        await ctx.db.patch(studentId, { texts: 0, score: 0 });
    },
})

export const createNewStudent = mutation({
    args: { studentName: v.string(), studentPhoneNumber: v.string(), classId: v.string() }, 
    handler: async (ctx, { studentName, studentPhoneNumber, classId }) => {
        const classData = await ctx.db.query("classes").filter((q) => q.eq(q.field("_id"), classId)).first();
        const studentData = await ctx.db.query("students").filter((q) => q.eq(q.field("phoneNumber"), studentPhoneNumber)).first();
        const doesStudentExist = classData.students.includes(studentData._id)
        if(!doesStudentExist){
        return await ctx.db.insert("students", { name: studentName, phoneNumber: studentPhoneNumber, texts: 0, score: 0, indexesSeen: [] });
    }
}})


export const getStudentFromPhoneNumber = query({
    args: { phoneNumber: v.string() },
    handler: async (ctx, { phoneNumber }) => {
        return await ctx.db
            .query("students")
            .filter((q) => q.eq(q.field("phoneNumber"), phoneNumber))
            .first();
    },  
})
