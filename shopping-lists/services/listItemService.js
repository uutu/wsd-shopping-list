import { executeQuery } from "../database/database.js";

/*
 * A service for creating, finding and marking
 * list items in any given shopping list.
 *
 */

const createListItem = async (list_id) => {
    await executeQuery(
        "INSERT INTO shopping_list_items (shopping_list_id) VALUES ($itemId);",
        {
            itemId: shopping_list_id,
        }
    );
};

const findListItems = async (list_id) => {
    await executeQuery(
        "SELECT * FROM shopping_list_items WHERE shopping_list_id = $itemId;",
        {
            itemId: list_id,
        }
    );

    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    }

    return false;
}

const markCollected = async (id) => {
    await executeQuery(
        "UPDATE shopping_list_items SET collected = TRUE WHERE id = $id;",
        {
            id: id,
        }
    );
};

export { createListItem, findListItems, markCollected };