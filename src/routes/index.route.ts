import { IncomingMessage, ServerResponse } from "http"
import { getTasks } from "../function/get-task"
import { createTask } from "../function/create-task"
import { updateTask } from "../function/update-task"
import { deleteTask } from "../function/delete-task"
import { markTaskCompleted } from "../function/mark-task-completed"

type routeProps = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    path: string,
    handler: (request:IncomingMessage, response:ServerResponse) => Promise<void>
}

export const routes: routeProps[] = [
    {
        method: "GET",
        path: "/tasks",
        handler: getTasks
    },
    {
        method: "POST",
        path: "/tasks",
        handler: createTask,
    },
    {
        method: "PUT",
        path: "/tasks/:id",
        handler: updateTask 
    },
    {
        method: "DELETE",
        path: "/tasks/:id",
        handler: deleteTask
    },
    {
        method: "PATCH",
        path: "/tasks/:id",
        handler: markTaskCompleted
    }

]