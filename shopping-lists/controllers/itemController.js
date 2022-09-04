import * as listItemService from "../services/listItemService.js";

const redirectTo = (path) => {
    return new Response(`Redirecting - ${path}.`, {
        status: 303,
        headers: {
            "Location": path,
        },
    });
};

const createItem = async (request) => {
    const url = new URL(request.url);
    const urlSplit = url.pathname.split("/");

    await listItemService.createListItem(urlSplit[2]);

    return redirectTo(`/lists/${urlSplit[2]}`);
};

export { createItem };