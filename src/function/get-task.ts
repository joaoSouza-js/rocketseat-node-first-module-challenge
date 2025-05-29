import { IncomingMessage, ServerResponse } from "node:http";
import { database } from "../database";



export async function getTasks(request:IncomingMessage, response:ServerResponse){
    const content = await database.select<TASK_DTO>("tasks",request.params)
    response.writeHead(200).end(JSON.stringify(content))
}
