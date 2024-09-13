import { ChapterOneAction, ChapterOneActionTypes, IChapterLab2ToDo, IChapterState } from "./types";

const initialState: IChapterState = {
    lab2ToDo: {
        todoList: [
            { userId: 1, id: 1, title: "delectus aut autem", completed: false },
            { userId: 1, id: 2, title: "quis ut nam facilis et officia qui", completed: true },
        ],
        nextIdToDo: 3,
        defaultUserId: 1,
    },
};

const updateToDoById = (todoList: IChapterLab2ToDo[], id: number, updateFn: (todo: IChapterLab2ToDo) => IChapterLab2ToDo) => {
    return todoList.map(todo => (todo.id === id ? updateFn(todo) : todo));
};

export const chapterOne = (state = initialState, { type, payload }: ChapterOneAction): IChapterState => {
    switch (type) {
        case ChapterOneActionTypes.AddToDo:
            return {
                ...state,
                lab2ToDo: {
                    ...state.lab2ToDo,
                    nextIdToDo: state.lab2ToDo.nextIdToDo + 1,
                    todoList: [...state.lab2ToDo.todoList, payload],
                },
            };
        case ChapterOneActionTypes.ChangeToDoTitle:
            return {
                ...state,
                lab2ToDo: {
                    ...state.lab2ToDo,
                    todoList: updateToDoById(state.lab2ToDo.todoList, payload.id, todo => ({ ...todo, title: payload.title })),
                },
            };
        case ChapterOneActionTypes.DeleteToDo:
            return {
                ...state,
                lab2ToDo: {
                    ...state.lab2ToDo,
                    todoList: state.lab2ToDo.todoList.filter(({ id }) => id !== payload),
                },
            };
        case ChapterOneActionTypes.ChangeToDoStatus:
            return {
                ...state,
                lab2ToDo: {
                    ...state.lab2ToDo,
                    todoList: updateToDoById(state.lab2ToDo.todoList, payload, todo => ({ ...todo, completed: !todo.completed })),
                },
            };
        default:
            return state;
    }
};
