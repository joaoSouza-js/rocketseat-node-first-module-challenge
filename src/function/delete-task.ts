import { IncomingMessage, ServerResponse } from "node:http";
import { database } from "../database";

export async function deleteTask(request:IncomingMessage, response:ServerResponse) {
    await database.delete("tasks",request.params)
    response.writeHead(204).end()
}