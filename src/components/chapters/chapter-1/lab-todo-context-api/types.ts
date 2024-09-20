import { IChapterLab2ToDo } from "../types";

export interface ToDoContext {
    todoList: IChapterLab2ToDo[]
    nextIdToDo: number
    defaultUserId: number
    setToDoList: (todoList: IChapterLab2ToDo[]) => void
    setNextIdToDo: (nextIdToDo: number) => void
    updateToDo: (_todo: IChapterLab2ToDo) => void
    deleteToDo: (_id: number) => void
    initToDo: () => void
};