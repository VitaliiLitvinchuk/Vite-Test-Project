/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { ToDoContext } from "./types";
import { IChapterLab2ToDo } from "../types";

export const ToDoListContext = createContext<ToDoContext>({
    todoList: [],
    nextIdToDo: 1,
    defaultUserId: 1,
    fetching: false,
    handleShowUserModal: (_userId: number) => { },
    handleShowEditModal: (_todo: IChapterLab2ToDo) => { },
    setToDoList: (_todoList: IChapterLab2ToDo[]) => { },
    setNextIdToDo: (_nextIdToDo: number) => { },
    updateToDo: (_todo: IChapterLab2ToDo) => { },
    addToDo: (_todo: IChapterLab2ToDo) => { },
    deleteToDo: (_id: number) => { },
    initToDo: () => { }
});