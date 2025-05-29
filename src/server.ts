import { createServer } from "node:http";
import { jsonMiddleware } from "./middleware/json";
import { routes } from "./routes/index.route";

const server = createServer(async (request, response) => {
    const { url, method } = request;
    await jsonMiddleware(request);
    const route = routes.find(
        (route) => route.method === method && route.path === url
    );
    if (route) return route.handler(request, response);
});

server.listen(3333, () => {
    console.log("Server is running on http://localhost:3333");
});
