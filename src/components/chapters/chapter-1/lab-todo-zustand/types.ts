import { IChapterLab2ToDo } from "../types";

export interface ToDoState {
    todoList: IChapterLab2ToDo[];
    nextIdToDo: number;
    defaultUserId: number;
    addToDo: (todo: IChapterLab2ToDo) => void;
    initToDoList: () => void;
    changeToDoTitle: (id: number, title: string) => void;
    deleteToDo: (id: number) => void;
    changeToDoStatus: (id: number) => void;
};