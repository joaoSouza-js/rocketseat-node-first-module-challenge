import { randomUUID } from "node:crypto";

export function createNewTask(title = "", description = "") {
    const now = new Date();
    const newTask: TASK_DTO = {
        id: randomUUID(),
        title: title.trim(),
        description: description.trim(),
        completedAt: null,
        createdAt: now,
        updatedAt: now,
    };
    return newTask;
}