import { executeQuery } from "../database/database.js";

/*
 * A service for creating, finding and marking
 * list items in any given shopping list.
 * Sorting for list items is done within the SQL query.
 */

const createListItem = async (list_id, name) => {
    await executeQuery(
        "INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($itemId, $name);",
        {
            itemId: list_id,
            name: name,
        }
    );
};

const findListItems = async (list_id) => {
    let result = await executeQuery(
        "SELECT * FROM shopping_list_items WHERE shopping_list_id = $itemId ORDER BY collected ASC, name ASC;",
        {
            itemId: list_id,
        }
    );

    if (result.rows && result.rows.length > 0) {
        return result.rows;
    }

    return false;
};

const markCollected = async (id) => {
    await executeQuery(
        "UPDATE shopping_list_items SET collected = TRUE WHERE id = $id;",
        {
            id: id,
        }
    );
};

export { createListItem, findListItems, markCollected };