const { validateCredentials } = require("./auth");
 
exports.handler = async (event) => {
    let body;
 
    try {
        body = JSON.parse(event.body || "{}");
    } catch {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid request." })
        };
    }
 
    const valid = validateCredentials(
        body.username,
        body.password
    );
 
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        },
        body: JSON.stringify({
            message: valid
                ? "Login successful!"
                : "Invalid username or password."
        })
    };
};
 