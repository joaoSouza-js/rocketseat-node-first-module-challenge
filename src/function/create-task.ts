import { IncomingMessage, ServerResponse } from "node:http";
import { database } from "../database";
import { createNewTask } from "../utils/create-new-task";

type createTaskProps = {
    title: string,
    description: string
}

export async function createTask(request:IncomingMessage, response:ServerResponse) {
    const body:createTaskProps = request.body
    const {title, description} = body
    const newTask: TASK_DTO =  createNewTask(title, description)
    database.insert<createTaskProps>("tasks",newTask)
    response.writeHead(201)
    response.end(JSON.stringify(newTask))

}