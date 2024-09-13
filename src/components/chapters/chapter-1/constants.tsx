import ToDoList from "./lab-2-todo";

interface IShowLab {
    [key: string]: JSX.Element
}

export const labs: IShowLab[] = [
    {
        'Lab "To Do List"': <ToDoList />,
    }
];