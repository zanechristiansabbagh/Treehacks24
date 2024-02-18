import { httpAction } from "./_generated/server";

export const fetchEmbeddings = httpAction(async (ctx, request) => {
  // Parse the request body
  const { url, collectionId } = await request.json();

  // Prepare the request body for the external API call
  const body = new URLSearchParams();
  body.append("file", url);
  body.append("collection_id", collectionId);

  // Make the external API call
  const response = await fetch(`https://d6700028769d.ngrok.app/embed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  // Check the response and return accordingly
  if (!response.ok) {
    return new Response(`HTTP error! status: ${response.status}`, {
      status: response.status,
    });
  }

  const result = await response.json();
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});
