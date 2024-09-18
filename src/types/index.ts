export enum SortBy {
    DATE = "date",
    TEXT = "text"
}

export type Todo = {
    id: string
    text: string
    completed: boolean
    createdAt: string
}