import { Table } from "react-bootstrap"
import { useTypedSelector } from "../../../../../hooks/useTypedSelector"
import { useState } from "react"
import { IChapterLab2ToDo } from "../../types"
import { useActions } from "../../../../../hooks/useActions"
import TableRow from "./TableRow"

const ToDoTable = () => {
    const { todoList, nextIdToDo, defaultUserId } = useTypedSelector(state => state.chapterOne);
    const { AddNewToDo, ChangeToDoTitle, ChangeStatusToDo, DeleteToDo } = useActions();

    const [todo, setTodo] = useState<IChapterLab2ToDo>({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });
    const [filter, setFilter] = useState<string>("");

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    const handleCreate = () => {
        AddNewToDo(todo);
        setTodo({ userId: defaultUserId, id: nextIdToDo + 1, title: "", completed: false });
    }

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (id === todo.id) {
            setTodo({ ...todo, title: e.target.value });
            return;
        }
        ChangeToDoTitle(e.target.value, id);
    }

    const handleDelete = (id: number) => {
        DeleteToDo(id);
    }

    const handleChangeStatus = (id: number) => {
        ChangeStatusToDo(id);
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead className="align-middle">
                <tr>
                    <th>User id</th>
                    <th>Task id</th>
                    <th>
                        <input type="text" className="form-control" placeholder="Filter by title" onChange={handleFilter} />
                    </th>
                    <th>Completed</th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody className="align-middle">
                {todoList.filter(x => x.title.includes(filter)).map(todo => (
                    <TableRow key={`${todo.id} ${todo.title}`}
                        todo={todo}
                        handleEdit={handleEdit}
                        handleChangeStatus={handleChangeStatus}
                        bootstrapButtonType='btn-outline-danger'
                        actionName='Delete'
                        disabledStatus={false}
                        handleAction={handleDelete} />
                ))}
                <TableRow
                    key={`${todo.id} ${todo.title}`}
                    todo={todo}
                    handleEdit={handleEdit}
                    handleChangeStatus={handleChangeStatus}
                    bootstrapButtonType='btn-outline-primary'
                    actionName='Add'
                    disabledStatus={true}
                    handleAction={handleCreate} />
            </tbody>
        </Table>
    )
}
export default ToDoTable