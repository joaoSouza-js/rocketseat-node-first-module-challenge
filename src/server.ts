import { createServer } from "node:http";
import { jsonMiddleware } from "./middleware/json";
import { routes } from "./routes/index.route";
import { getRouteRegex } from "./utils/route-regex";
import { multipartMiddleware } from "./middleware/multipart";

const server = createServer(async (request, response) => {
    const { method } = request;
    const url = request.url as string;
    await jsonMiddleware(request);
   
    const route = routes.find((route) => {
        const regex = getRouteRegex(route.path).test(url as string);
        return regex && route.method === method;
    });

    if (!route) return response.writeHead(404).end();

    const match = url.match(getRouteRegex(route.path)) ?? []
    const paramNames = [...route.path.matchAll(/:([^\/]+)/g)].map((m) => m[1]);
    const params = {};

    paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
    });

    request.params = params
  

    route.handler(request, response);
});

server.listen(3333, () => {
    console.log("Server is running on http://localhost:3333");
});
