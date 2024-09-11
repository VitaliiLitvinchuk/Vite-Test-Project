import { ChapterOneAction, ChapterOneActionTypes, ITestState } from "./types"

const initialState: ITestState = {
    test: 'test',
}

export const chapterOne = (state = initialState, action: ChapterOneAction): ITestState => {
    switch (action.type) {
        case ChapterOneActionTypes.Test:
            return {
                ...state,
                test: action.test
            }
        default:
            return state
    }
}