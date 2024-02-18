"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";

export const getEmbeddings = action({
  args: { file: v.string(), collection_id: v.string() },
  handler: async (_, args) => {
    // const body = new URLSearchParams();
    // body.append("file", args.file);
    // body.append("collection_id", args.collection_id);
    // console.log(body);
    // return body;
    const data = await fetch("https://2e59c4e42772.ngrok.app/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: args.file,
        collection_id: args.collection_id,
      }),
    });

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const result = await data.json();
    return result;
    console.log("Success:", result);
  },
});
