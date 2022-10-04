import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";
import * as listItemService from "../services/listItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

/*
 * A controller for viewing and adding shopping lists.
 *
 */

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addNewList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await shoppingListService.addNewList(name);

    return requestUtils.redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
        lists: await shoppingListService.findAllActiveLists(),
    };

    return new Response(await renderFile("shoppingLists.eta", data), responseDetails);
};

const viewItems = async (request) => {
    const url = new URL(request.url);
    const urlSplit = url.pathname.split("/");

    const data = {
        list: await shoppingListService.findById(urlSplit[2]),
        currentList: await listItemService.findListItems(urlSplit[2]),
    };

    return new Response(await renderFile("itemsList.eta", data), responseDetails);
};

export { addNewList, viewLists, viewItems };