import { executeQuery } from "../database/database.js";

/*
 * A service for adding new shopping lists and listing them.
 * List is active by default based on the DB schema.
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

export { addNewList, findAllActiveLists, findById };