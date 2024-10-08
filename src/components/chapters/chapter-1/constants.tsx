import { IShowLabs } from "../constants";
import Lab9 from "./lab-8";
import ToDoListContextApi from "./lab-todo-context-api";
import ToDoListReactQuery from "./lab-todo-react-query";
import ToDoListToolkit from "./lab-todo-redux-toolkit";
import ToDoListZustand from "./lab-todo-zustand";

export const labs: IShowLabs = {
    'Lab redux toolkit "To Do List"': <ToDoListToolkit />,
    'Lab react query "To Do List"': <ToDoListReactQuery />,
    'Lab zustand "To Do List"': <ToDoListZustand />,
    'Lab context api "To Do List"': <ToDoListContextApi />,
    'Lab 9': <Lab9 />
}