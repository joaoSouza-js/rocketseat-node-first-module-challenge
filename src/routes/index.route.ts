import { IncomingMessage, ServerResponse } from "node:http";
import { getTasks } from "../function/get-task"
import { createTask } from "../function/create-task"
import { updateTask } from "../function/update-task"
import { deleteTask } from "../function/delete-task"
import { markTaskCompleted } from "../function/mark-task-completed"
import { csvUploads } from "../function/task-csv-file";

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
        method: "PUT",
        path: "/tasks/:id",
        handler: updateTask 
    },
    {
        method: "PATCH",
        path: "/tasks/:id/complete",
        handler: markTaskCompleted,
    },
    {
        method: "DELETE",
        path: "/tasks/:id",
        handler: deleteTask
    },
    {
        method: "POST",
        path: "/tasks/files/upload-csv",
        handler: csvUploads
    }

]