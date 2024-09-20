import { ReactNode, useState } from 'react'
import { ToDoListContext } from './context';
import { IChapterLab2ToDo } from '../types';
import axios from 'axios';

const Provider = ({ children }: { children: ReactNode }) => {
    const [todoList, setToDoList] = useState<IChapterLab2ToDo[]>([]);
    const [nextIdToDo, setNextIdToDo] = useState<number>(1);
    const [defaultUserId] = useState<number>(1);

    const updateToDo = (todo: IChapterLab2ToDo) => {
        setToDoList(todoList.map(t => (t.id === todo.id ? todo : t)));
    }

    const deleteToDo = (id: number) => {
        setToDoList(todoList.filter(t => t.id !== id));
    }

    let isFetching = false;
    const initToDo = async () => {
        if (todoList.length === 0 && nextIdToDo === 1 && !isFetching) {
            isFetching = true;
            await axios.get<IChapterLab2ToDo[]>(`https://jsonplaceholder.typicode.com/todos?_start=100&_limit=10`).then(response => {
                setToDoList(response.data);
                setNextIdToDo(response.data.sort((a, b) => b.id - a.id)[0].id + 1);
            });
        }
        isFetching = false;
    }

    return (
        <ToDoListContext.Provider
            value={{
                todoList: todoList,
                nextIdToDo: nextIdToDo,
                defaultUserId: defaultUserId,
                setToDoList: setToDoList,
                setNextIdToDo: setNextIdToDo,
                updateToDo: updateToDo,
                deleteToDo: deleteToDo,
                initToDo: initToDo
            }}
        >
            {children}
        </ToDoListContext.Provider>
    )
};

export default Provider;