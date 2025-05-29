import { IncomingMessage, ServerResponse } from "node:http";
import { database } from "../database";


export async function updateTask(request:IncomingMessage, response:ServerResponse){
    const body: TASK_DTO = request.body 
    const content = await database.update({
        data: body,
        params: request.params,
        table: "users"
    })
    response.writeHead(200).end(JSON.stringify(content))
}