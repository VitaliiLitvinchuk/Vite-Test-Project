import { create } from "zustand";
import { IChapterLab2ToDo } from "../types";
import { ToDoState } from "./types";
import axios from "axios";

const updateToDoById = (
    todoList: IChapterLab2ToDo[],
    id: number,
    updateFn: (todo: IChapterLab2ToDo) => IChapterLab2ToDo
) => {
    return todoList.map(todo => (todo.id === id ? updateFn(todo) : todo));
};

export const useToDoStore = create<ToDoState>((set) => ({
    todoList: [],
    nextIdToDo: 1,
    defaultUserId: 1,
    addToDo: (todo: IChapterLab2ToDo) =>
        set((state) => ({
            todoList: [todo, ...state.todoList],
            nextIdToDo: state.nextIdToDo + 1,
        })),
    initToDoList: async () => {
        const response = await axios.get<IChapterLab2ToDo[]>(`https://jsonplaceholder.typicode.com/todos?_start=10&_limit=10`);

        return set(() => ({
            todoList: response.data,
            nextIdToDo: response.data.sort((a, b) => b.id - a.id)[0].id + 1,
        }));
    },
    changeToDoTitle: (id: number, title: string) =>
        set((state) => ({
            todoList: updateToDoById(state.todoList, id, (todo) => ({
                ...todo,
                title,
            })),
        })),
    deleteToDo: (id: number) =>
        set((state) => ({
            todoList: state.todoList.filter((todo) => todo.id !== id),
        })),
    changeToDoStatus: (id: number) =>
        set((state) => ({
            todoList: updateToDoById(state.todoList, id, (todo) => ({
                ...todo,
                completed: !todo.completed,
            })),
        })),
}));
