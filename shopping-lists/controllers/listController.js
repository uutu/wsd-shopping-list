import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";
import * as listItemService from "../services/listItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

/*
 * A controller for viewing, adding and deactivating shopping lists.
 * The main page -function returns applicable statistics about the app.
 */

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewMainPage = async (request) => {

    const data = {
        listCount: await shoppingListService.countAllLists(),
        itemCount: await shoppingListService.countAllItems(),
    };

    return new Response(await renderFile("mainPage.eta", data), responseDetails);
}

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
        currentListItems: await listItemService.findListItems(urlSplit[2]),
    };

    return new Response(await renderFile("itemsList.eta", data), responseDetails);
};

const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlSplit = url.pathname.split("/");
    
    await shoppingListService.deactivateById(urlSplit[2]);

    return requestUtils.redirectTo("/lists");
};

export { viewMainPage, addNewList, viewLists, viewItems, deactivateList };