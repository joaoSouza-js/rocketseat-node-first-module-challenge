import { IncomingMessage, ServerResponse } from "node:http";
import { database } from "../database";



export async function markTaskCompleted(request:IncomingMessage, response:ServerResponse){
    await database.update({
        data: {completedAt: new Date()},
        params: request.params,
        table: "tasks"
    })
    response.writeHead(204).end()
}
