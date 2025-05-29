import { IncomingMessage, ServerResponse } from "node:http";
import { database } from "../database";
import { randomUUID } from "node:crypto";

type createTaskProps = {
    title: string,
    description: string
}

export async function createTask(request:IncomingMessage, response:ServerResponse) {
    const body:createTaskProps = request.body
    const {title, description} = body
    const rightNow = new Date()
    const newTask: TASK_DTO =  {
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt: rightNow,
        updatedAt: rightNow
    }
    database.insert<createTaskProps>("tasks",newTask)
    response.writeHead(201)
    response.end(JSON.stringify(newTask))

}