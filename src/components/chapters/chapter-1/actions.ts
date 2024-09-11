import { Dispatch } from "redux"
import { ChapterOneAction, ChapterOneActionTypes } from "./types"

export const SetTestValue = (newValue: string) => {
    return (dispatch: Dispatch<ChapterOneAction>) => {
        dispatch({
            type: ChapterOneActionTypes.Test,
            test: newValue
        })
    }
}