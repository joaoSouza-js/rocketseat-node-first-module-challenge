interface TASK_DTO {
    id: string,
    title: string,
    description: string
    completedAt: string | Date | null,
    updatedAt: string | Date | null
    createdAt: string | Date
}