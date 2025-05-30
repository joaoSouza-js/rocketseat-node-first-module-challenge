import { IncomingMessage, ServerResponse } from "node:http";
import { database } from "../database";
import { createNewTask } from "../utils/create-new-task";


export async function csvUploads(request:IncomingMessage, response:ServerResponse) {
      const contentType = request.headers["content-type"];
    const isCsv = contentType?.includes("text/csv");

    if (!isCsv) return 


    let taskArray: TASK_DTO[][] = [];
    for await (const chunk of request) {
        
        const lines = chunk.toString("utf-8").split("\n");
        const tasks = lines.map((line:string) => {
            const [title = "", description = ""] = line.split(",");
            return createNewTask(title, description);
        });

        taskArray.push(tasks)
        console.log(taskArray.length)
 
        if(taskArray.length > 50){
          const  taskArrayToSave = taskArray.flatMap((task) => task)
          await database.insertMany("tasks",taskArrayToSave)
        
          taskArray = []
        }
        

       
    }
    if(taskArray.length > 0){
        const  taskArrayToSave = taskArray.flatMap((task) => task)
        await database.insertMany("tasks",taskArrayToSave)
    }   

    response.writeHead(201).end()
}