import { combineReducers } from "redux";
import { chapterOne } from "../../components/chapters/chapter-1/reducer";

export const rootReducer = combineReducers({
    chapterOne: chapterOne
});

export type RootState = ReturnType<typeof rootReducer>;