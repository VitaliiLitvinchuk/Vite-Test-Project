import { ChapterOneAction, ChapterOneActionTypes, IChapterState } from "./types"

const initialState: IChapterState = {
    todoList: [
        {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false
        },
        {
            userId: 1,
            id: 2,
            title: "quis ut nam facilis et officia qui",
            completed: true
        }
    ],
    nextIdToDo: 3,
    defaultUserId: 1
}

export const chapterOne = (state = initialState, action: ChapterOneAction): IChapterState => {
    switch (action.type) {
        case ChapterOneActionTypes.AddToDo: {
            return {
                ...state,
                nextIdToDo: state.nextIdToDo + 1,
                todoList: [...state.todoList, action.payload]
            }
        }
        case ChapterOneActionTypes.ChangeToDoTitle: {
            return {
                ...state,
                todoList: state.todoList.map(x => {
                    if (x.id === action.payload.id)
                        return { ...x, title: action.payload.title };
                    return x;
                })
            };
        }
        case ChapterOneActionTypes.DeleteToDo: {
            return {
                ...state,
                todoList: state.todoList.filter(x => x.id !== action.payload)
            }
        }
        case ChapterOneActionTypes.ChangeToDoStatus: {
            return {
                ...state,
                todoList: state.todoList.map(x => {
                    if (x.id === action.payload)
                        return { ...x, completed: !x.completed };
                    return x;
                })
            };
        }
        default:
            return state
    }
}