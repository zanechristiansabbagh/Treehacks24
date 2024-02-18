import { httpRouter } from "convex/server";
import { fetchEmbeddings } from "./myHttpActions";

const http = httpRouter();

http.route({
  path: "/fetchEmbeddings",
  method: "POST",
  handler: fetchEmbeddings,
});

export default http;
