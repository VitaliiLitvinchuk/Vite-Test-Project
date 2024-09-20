import { Dispatch } from "redux"
import { ChapterOneAction, ChapterOneActionTypes, IChapterLab2ToDo } from "./types"
import axios from "axios"

export const AddNewToDo = (newTodo: IChapterLab2ToDo) => {
    return (dispatch: Dispatch<ChapterOneAction>) => {
        dispatch({
            type: ChapterOneActionTypes.AddToDo,
            payload: newTodo
        })
    }
}

export const ChangeToDoTitle = (title: string, id: number) => {
    return (dispatch: Dispatch<ChapterOneAction>) => {
        dispatch({
            type: ChapterOneActionTypes.ChangeToDoTitle,
            payload: {
                id,
                title
            }
        })
    }
}

export const DeleteToDo = (id: number) => {
    return (dispatch: Dispatch<ChapterOneAction>) => {
        dispatch({
            type: ChapterOneActionTypes.DeleteToDo,
            payload: id
        })
    }
}

export const ChangeStatusToDo = (id: number) => {
    return (dispatch: Dispatch<ChapterOneAction>) => {
        dispatch({
            type: ChapterOneActionTypes.ChangeToDoStatus,
            payload: id
        })
    }
}

let isFetching = false;
export const InitToDoList = () => {
    return async (dispatch: Dispatch<ChapterOneAction>) => {
        if (isFetching) return;

        isFetching = true;
        try {
            const response = await axios.get<IChapterLab2ToDo[]>(`https://jsonplaceholder.typicode.com/todos?_limit=10`);

            dispatch({
                type: ChapterOneActionTypes.InitToDoList,
                payload: response.data
            });
        } finally {
            isFetching = false;
        }
    };
};