import React, { useContext } from "react";
import classNames from "classnames";
import { ToDoListContext } from "../../context";
import { IChapterLab2ToDo } from "../../../types";

interface ITableDataProps {
    todo: IChapterLab2ToDo,
}

const TableData = React.memo(({ todo }: ITableDataProps) => {
    const { deleteToDo, handleShowUserModal, handleShowEditModal, updateToDo } = useContext(ToDoListContext);

    return (
        <>
            <td onClick={() => handleShowUserModal(todo.userId)}>{todo.userId}</td>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>
                <button className="btn border-0" onClick={() => updateToDo({ ...todo, completed: !todo.completed })}>
                    <i className={classNames("fa fa-2x", todo.completed ? 'fa-check text-success' : 'fa-times text-danger')}></i>
                </button>
            </td>
            <td>
                <div className="d-flex gap-3">
                    <button className={classNames("btn btn-warning w-50", todo.completed ? "disabled" : "")} onClick={() => handleShowEditModal(todo)}>
                        Edit
                    </button>
                    <button className="btn btn-danger w-50" onClick={() => deleteToDo(todo.id)}>
                        Delete
                    </button>
                </div>
            </td>
        </>
    )
})

export default TableData