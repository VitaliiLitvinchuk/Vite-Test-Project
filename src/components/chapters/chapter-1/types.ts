export enum ChapterOneActionTypes {
    AddToDo = "AddToDo",
    ChangeToDoTitle = "ChangeToDoTitle",
    ChangeToDoStatus = "ChangeToDoStatus",
    DeleteToDo = "DeleteToDo",
    FilterByTitle = "FilterByTitle"
}

export interface IChapterState {
    todoList: IChapterLab2ToDo[],
    nextIdToDo: number,
    defaultUserId: number
}

//
export interface IChapterLab2ToDo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export interface IChapterLab2AddAction {
    type: ChapterOneActionTypes.AddToDo,
    payload: IChapterLab2ToDo
}

export interface IChapterLab2ChangeTitleAction {
    type: ChapterOneActionTypes.ChangeToDoTitle,
    payload: {
        id: number,
        title: string
    }
}

export interface IChapterLab2DeleteAction {
    type: ChapterOneActionTypes.DeleteToDo,
    payload: number
}

export interface IChapterLab2ChangeToDoStatus {
    type: ChapterOneActionTypes.ChangeToDoStatus,
    payload: number
}

export interface IChapterLab2FilterByTitleAction {
    type: ChapterOneActionTypes.FilterByTitle,
    payload: string
}
//

export type ChapterOneAction = IChapterLab2AddAction | IChapterLab2ChangeTitleAction | IChapterLab2DeleteAction | IChapterLab2ChangeToDoStatus
    | IChapterLab2FilterByTitleAction; 