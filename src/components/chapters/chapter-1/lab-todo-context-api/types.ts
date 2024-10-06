import { IChapterLab2ToDo } from "../types"

export interface ToDoContext {
    todoList: IChapterLab2ToDo[]
    nextIdToDo: number
    defaultUserId: number
    fetching: boolean
    handleShowUserModal: (_userId: number) => void
    handleShowEditModal: (_todo: IChapterLab2ToDo) => void
    addToDo: (todo: IChapterLab2ToDo) => void
    updateToDo: (todo: IChapterLab2ToDo) => void
    setToDoList: (todoList: IChapterLab2ToDo[]) => void
    setNextIdToDo: (nextIdToDo: number) => void
    deleteToDo: (_id: number) => void
    initToDo: () => void
};