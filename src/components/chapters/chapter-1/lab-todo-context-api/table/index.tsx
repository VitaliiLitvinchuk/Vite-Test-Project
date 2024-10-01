import { Table } from "react-bootstrap";
import { useState, useCallback, useMemo, useEffect, useContext } from "react";
import { IChapterLab2ToDo } from "../../types";
import { ToDoListContext } from "../context";
import TableRow from "../../features/TableRow";

const ToDoTable = () => {
    const { todoList, nextIdToDo, defaultUserId, setToDoList, setNextIdToDo, deleteToDo, updateToDo, initToDo } = useContext(ToDoListContext);;

    const [filter, setFilter] = useState<string>("");
    const [todo, setTodo] = useState<IChapterLab2ToDo>({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });

    useEffect(() => {
        initToDo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTodo({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });
    }, [nextIdToDo, defaultUserId]);

    const handleFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }, []);

    const handleCreate = useCallback(() => {
        setToDoList([todo, ...todoList]);
        setNextIdToDo(nextIdToDo + 1);
    }, [setToDoList, todo, todoList, setNextIdToDo, nextIdToDo]);

    const handleEdit = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (id === todo.id) {
            setTodo({ ...todo, title: e.target.value });
            return;
        }
        const todoUpdate = todoList.find(x => x.id === id);
        if (todoUpdate)
            updateToDo({ ...todoUpdate, title: e.target.value });
    }, [todo, todoList, updateToDo]);

    const handleDelete = useCallback((id: number) => {
        deleteToDo(id);
    }, [deleteToDo]);

    const handleChangeStatus = useCallback((id: number) => {
        const todo = todoList.find(x => x.id === id);
        if (todo)
            updateToDo({ ...todo, completed: !todo.completed });
    }, [todoList, updateToDo]);

    const filteredTodoList = useMemo(() => {
        return todoList.filter(x => x.title.includes(filter));
    }, [todoList, filter]);

    return (
        <Table striped bordered hover variant="dark">
            <thead className="align-middle">
                <tr>
                    <th style={{ width: "10%" }}>User id</th>
                    <th style={{ width: "10%" }}>Task id</th>
                    <th style={{ width: "55%" }}>
                        <input type="text" className="form-control" placeholder="Filter by title" onChange={handleFilter} />
                    </th>
                    <th style={{ width: "10%" }}>Completed</th>
                    <th style={{ width: "15%" }}></th>
                </tr>
            </thead>
            <tbody className="align-middle">
                <TableRow
                    key={todo.id}
                    todo={todo}
                    bootstrapButtonType='btn-outline-primary'
                    actionName='Add'
                    disableStatus={true}
                    disableActionOnEmpty={true}
                    handleEdit={handleEdit}
                    handleChangeStatus={handleChangeStatus}
                    handleAction={handleCreate} />
                <tr>
                    <td colSpan={5}>
                        <hr />
                    </td>
                </tr>
                {
                    filteredTodoList.map(todo => (
                        <TableRow
                            key={todo.id}
                            todo={todo}
                            bootstrapButtonType='btn-outline-danger'
                            actionName='Delete'
                            disableStatus={false}
                            disableActionOnEmpty={false}
                            handleEdit={handleEdit}
                            handleChangeStatus={handleChangeStatus}
                            handleAction={handleDelete} />
                    ))
                }
            </tbody>
        </Table>
    );
}

export default ToDoTable;
