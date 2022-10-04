import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});


const handleRequest = async (request) => {
  const url = new URL(request.url);

  // Change after mainpage is ready
  if (url.pathname === "/" && request.method === "GET") {
    return await listController.viewMainPage(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addNewList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewItems(request);
  } else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+") && request.method === "POST") {
    return await itemController.markAsCollected(request);
  } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.createItem(request);
  } else {
    return new Response("List not found", { status: 404});
  }
};

serve(handleRequest, { port: 7777 });
