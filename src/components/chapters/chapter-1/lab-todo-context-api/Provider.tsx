import { ReactNode, useCallback, useState } from 'react'
import { ToDoListContext } from './context';
import axios from 'axios';
import { IChapterLab2ToDo } from '../types';
import UserModal from '../features/modal';
import ToDoWorkerModal from './modal';
import CreateModal from './modal/create';

const Provider = ({ children }: { children: ReactNode }) => {
    const [todoList, setToDoList] = useState<IChapterLab2ToDo[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [nextIdToDo, setNextIdToDo] = useState<number>(1);
    const [defaultUserId] = useState<number>(1);

    const [showUserModal, setShowUserModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedTodo, setSelectedTodo] = useState<IChapterLab2ToDo>({} as IChapterLab2ToDo);

    const handleShowEditModal = useCallback((todo: IChapterLab2ToDo) => {
        setSelectedTodo(todo);
        setShowEditModal(true);
    }, []);

    const handleShowUserModal = useCallback((userId: number) => {
        setSelectedUserId(userId);
        setShowUserModal(true);
    }, []);

    const handleCloseUserModal = useCallback(() => {
        setShowUserModal(false);
        setSelectedUserId(null);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setShowEditModal(false);
        setSelectedTodo({} as IChapterLab2ToDo);
    }, []);

    const addToDo = useCallback((todo: IChapterLab2ToDo) => {
        setToDoList([todo, ...todoList]);
    }, [todoList]);

    const updateToDo = useCallback((todo: IChapterLab2ToDo) => {
        setToDoList(todoList.map(t => (t.id === todo.id ? todo : t)));
    }, [todoList]);

    const deleteToDo = useCallback((id: number) => {
        setToDoList(todoList.filter(t => t.id !== id));
    }, [todoList]);

    const initToDo = useCallback(async () => {
        if (todoList.length === 0 && nextIdToDo === 1 && !fetching) {
            setFetching(true);
            setTimeout(async () => {
                try {
                    await axios.get<IChapterLab2ToDo[]>(`https://jsonplaceholder.typicode.com/todos`).then(response => {
                        const length = response.data.length;
                        for (let i = 1; i < 10; i++)
                            for (let j = 0; j < length; j++)
                                response.data.push({ ...response.data[j], id: 200 * i + j + 1 });
                        setToDoList(response.data);
                        setNextIdToDo(response.data.sort((a, b) => b.id - a.id)[0].id + 1);
                        setFetching(false);
                    });
                }
                finally {
                    setFetching(false);
                }
            }, 400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ToDoListContext.Provider
            value={{
                todoList: todoList,
                nextIdToDo: nextIdToDo,
                defaultUserId: defaultUserId,
                fetching: fetching,
                handleShowUserModal: handleShowUserModal,
                handleShowEditModal: handleShowEditModal,
                addToDo: addToDo,
                updateToDo: updateToDo,
                setToDoList: setToDoList,
                setNextIdToDo: setNextIdToDo,
                deleteToDo: deleteToDo,
                initToDo: initToDo
            }}>
            {children}
            <CreateModal />
            <UserModal userId={selectedUserId} show={showUserModal} handleClose={handleCloseUserModal} />
            <ToDoWorkerModal show={showEditModal} todo={selectedTodo} title='Edit Title' handleClose={handleCloseEditModal} handleSubmit={updateToDo} />
        </ToDoListContext.Provider>
    )
};

export default Provider;