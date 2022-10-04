import * as listItemService from "../services/listItemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createItem = async (request) => {
    const url = new URL(request.url);
    const urlSplit = url.pathname.split("/");

    await listItemService.createListItem(urlSplit[2]);

    return requestUtils.redirectTo(`/lists/${urlSplit[2]}`);
};

export { createItem };