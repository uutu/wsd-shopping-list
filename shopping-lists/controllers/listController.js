import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";

/*
 * A controller for viewing and adding shopping lists.
 *
 */

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirect - ${path}.`, {
        status: 303,
        headers: {
            "Location": path,
        },
    });
};

const addNewList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await shoppingListService.addNewList(name);

    return redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
        lists: await shoppingListService.findAllActiveLists(),
    };

    return new Response(await renderFile("shoppingLists.eta", data), responseDetails);
};

export { addNewList, viewLists };