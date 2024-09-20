import React, { useState } from 'react'
import { IChapterLab2ToDo } from '../types'
import classNames from 'classnames'
import UserModal from './modal';

interface ITableRowProps {
    todo: IChapterLab2ToDo,
    handleEdit: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void,
    handleChangeStatus: (id: number) => void,
    actionName: string,
    bootstrapButtonType: string,
    disabledStatus: boolean,
    handleAction: (id: number) => void
}
// modal not required
const TableRow = React.memo(({ todo, handleEdit, handleChangeStatus, bootstrapButtonType, actionName, disabledStatus, handleAction }: ITableRowProps) => {
    const [focused, setFocused] = useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null);

    const handleShowModal = (userId: number) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUserId(null);
    };

    return (
        <tr>
            <td onClick={() => handleShowModal(todo.userId)}>{todo.userId}</td>
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
                    <i className={classNames("fa fa-2x", todo.completed ? 'fa-check text-success' : 'fa-times text-danger')}></i>
                </button>
            </td>
            <td>
                <button className={classNames("btn", bootstrapButtonType, "w-75")} disabled={focused} onClick={() => handleAction(todo.id)}>{actionName}</button>
            </td>
            <UserModal userId={selectedUserId} show={showModal} handleClose={handleCloseModal} />
        </tr>
    )
});

export default TableRow;