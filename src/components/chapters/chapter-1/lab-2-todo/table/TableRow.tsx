import React, { useState } from 'react'
import { IChapterLab2ToDo } from '../../types'
import classNames from 'classnames'

interface ITableRowProps {
    todo: IChapterLab2ToDo,
    handleEdit: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void,
    handleChangeStatus: (id: number) => void,
    actionName: string,
    bootstrapButtonType: string,
    disabledStatus: boolean,
    handleAction: (id: number) => void
}

const TableRow = ({ todo, handleEdit, handleChangeStatus, bootstrapButtonType, actionName, disabledStatus, handleAction }: ITableRowProps) => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <tr>
            <td>{todo.userId}</td>
            <td>{todo.id}</td>
            <td>
                <input type="text" className="form-control"
                    defaultValue={todo.title}
                    disabled={todo.completed}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
                        setFocused(false);
                        handleEdit(e, todo.id);
                    }} />
            </td>
            <td>
                <button className="btn border-0" disabled={disabledStatus} onClick={() => handleChangeStatus(todo.id)}>
                    <i className={classNames("fa fa-2x", todo.completed ? 'fa-check text-success' : 'fa-times text-danger')} aria-hidden="true"></i>
                </button>
            </td>
            <td>
                <button className={classNames("btn", bootstrapButtonType, "w-75")} disabled={focused} onClick={() => handleAction(todo.id)}>{actionName}</button>
            </td>
        </tr>
    )
}

export default TableRow