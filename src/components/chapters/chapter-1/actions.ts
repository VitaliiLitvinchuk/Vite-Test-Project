import { Dispatch } from "redux"
import { ChapterOneAction, ChapterOneActionTypes, IChapterLab2ToDo } from "./types"

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

export const FilterByTitle = (title: string) => {
    return (dispatch: Dispatch<ChapterOneAction>) => {
        dispatch({
            type: ChapterOneActionTypes.FilterByTitle,
            payload: title
        })
    }
}