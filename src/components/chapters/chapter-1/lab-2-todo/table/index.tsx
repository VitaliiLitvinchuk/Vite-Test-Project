import { Table } from "react-bootstrap";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { useState, useCallback, useMemo } from "react";
import { IChapterLab2ToDo } from "../../types";
import { useActions } from "../../../../../hooks/useActions";
import TableRow from "./TableRow";

const ToDoTable = () => {
    const { todoList, nextIdToDo, defaultUserId } = useTypedSelector(state => state.chapterOne.lab2ToDo);
    const { AddNewToDo, ChangeToDoTitle, ChangeStatusToDo, DeleteToDo } = useActions('chapterOne');

    const [todo, setTodo] = useState<IChapterLab2ToDo>({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });
    const [filter, setFilter] = useState<string>("");

    const handleFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }, []);

    const handleCreate = useCallback(() => {
        AddNewToDo(todo);
        setTodo({ userId: defaultUserId, id: nextIdToDo + 1, title: "", completed: false });
    }, [todo, nextIdToDo, defaultUserId, AddNewToDo]);

    const handleEdit = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (id === todo.id) {
            setTodo({ ...todo, title: e.target.value });
            return;
        }
        ChangeToDoTitle(e.target.value, id);
    }, [todo, ChangeToDoTitle]);

    const handleDelete = useCallback((id: number) => {
        DeleteToDo(id);
    }, [DeleteToDo]);

    const handleChangeStatus = useCallback((id: number) => {
        ChangeStatusToDo(id);
    }, [ChangeStatusToDo]);

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
                {
                    filteredTodoList.map(todo => (
                        <TableRow key={todo.id}
                            todo={todo}
                            handleEdit={handleEdit}
                            handleChangeStatus={handleChangeStatus}
                            bootstrapButtonType='btn-outline-danger'
                            actionName='Delete'
                            disabledStatus={false}
                            handleAction={handleDelete} />
                    ))
                }
                <TableRow
                    key={todo.id}
                    todo={todo}
                    handleEdit={handleEdit}
                    handleChangeStatus={handleChangeStatus}
                    bootstrapButtonType='btn-outline-primary'
                    actionName='Add'
                    disabledStatus={true}
                    handleAction={handleCreate} />
            </tbody>
        </Table>
    );
}

export default ToDoTable;
