// Refactored redirects in a single utility file

const redirectTo = (path) => {
    return new Response(`Redirect to ${path}.`, {
        status: 303,
        headers: {
            "Location": path,
        },
    });
};

export { redirectTo };