
export enum ChapterOneActionTypes {
    Test = "Test",
}

export interface ITestState {
    test: string
}

export interface ITestAction {
    type: ChapterOneActionTypes.Test,
    test: string
}

export type ChapterOneAction = ITestAction;