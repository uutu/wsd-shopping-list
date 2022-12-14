import { executeQuery } from "../database/database.js";

/*
 * A service for adding new shopping lists and listing them.
 * List is active by default based on the DB schema. Another function
 * is used to deactivate a shopping list.
 */

const addNewList = async (name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", {
        name: name,
    });
};

const findAllActiveLists = async () => {
    let result = await executeQuery(
        "SELECT * FROM shopping_lists WHERE active = true;"
    );

    return result.rows;
}

const findById = async (id) => {
    let result = await executeQuery(
        "SELECT * FROM shopping_lists WHERE id = $id;", {
            id: id,
        });
    
    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    }

    return { id: 0, name: "N/A" };
};

const deactivateById = async (id) => {
    let result = await executeQuery(
        "UPDATE shopping_lists SET active = FALSE WHERE id = $id;",
        {
            id: id,
        }
    );
};

const countAllLists = async () => {
    let result = await executeQuery(
        "SELECT COUNT(name) AS list_count FROM shopping_lists;"
    );
    
    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    }

    return { list_count: 0 };
};

const countAllItems = async () => {
    let result = await executeQuery(
        "SELECT COUNT(name) AS item_count FROM shopping_list_items;"
    );
    
    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    }

    return { item_count: 0 };
};

export { addNewList, findAllActiveLists, findById, deactivateById, countAllLists, countAllItems };