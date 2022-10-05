import { Pool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

/*
 * A connection pool is used to take care of connections.
 * The number of concurrent connections is set to 3 by default.
 */

let connectionPool;
if (Deno.env.get("DATABASE_URL")) {
  connectionPool = new Pool(Deno.env.get("DATABASE_URL"), CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);
}

const executeQuery = async (query, params) => {
    const response = {};
    let client;

    try {
        client = await connectionPool.connect();
        const result = await client.queryObject(query, params);

        if (result.rows) {
            response.rows = result.rows;
        }
    } catch (error) {
        console.log(error);
        response.error = e;
    } finally {
        if (client) {
            try {
                await client.release();
            } catch (error) {
                console.log("Error while releasing database connection.");
                console.log(error);
            }
        }
    }
    return response;
};

export { executeQuery };