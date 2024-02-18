import { action } from "./_generated/server";
import { internalQuery } from "./_generated/server";
import internal from "./_generated/api";
import { v } from "convex/values";

export const triggerTwilio = action({
    args: { teacherEmail: v.string(), qaPairs: v.array(v.object({ Question: v.string(), Answer: v.string() })),
    keyWords: v.array(v.string()), },
    handler: async (ctx, args) => {
        const data = await ctx.runQuery(internal.twilio.getStudentsInClass, {
            teacherEmail: args.teacherEmail,
        });
        const students = data;
        const response = await fetch("https://ta.ai.ngrok-free.app/send-sms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentPhoneNumbers: students,
                qa_pairs: args.qaPairs,
                keyWords: args.keyWords
            }),
        })
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    },
})


export const getStudentsInClass = internalQuery({
    args: { teacherEmail: v.string() },
    handler: async (ctx, args) => {
        const classDoc = await ctx.db
            .query("classes")
            .filter((q) => q.eq(q.field("teacherEmail"), args.teacherEmail))
            .first();
        return classDoc.students;
    },
});
