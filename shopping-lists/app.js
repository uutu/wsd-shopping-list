import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listController from "./controllers/listController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});


const handleRequest = async (request) => {
  const url = new URL(request.url);

  // Change after mainpage is ready
  if (url.pathname === "/" && request.method === "GET") {
    return new Response(`Redirecting to /lists.`, {
      status: 303,
      headers: {
        "Location": "/lists",
      },
    });
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addNewList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewItem(request);
  } else {
    return new Response("List not found", { status: 404});
  }
};

serve(handleRequest, { port: 7777 });
