import React, { useState } from 'react'
import { IChapterLab2ToDo } from '../types'
import classNames from 'classnames'
import UserModal from './modal';

interface ITableRowProps {
    todo: IChapterLab2ToDo,
    actionName: string,
    bootstrapButtonType: string,
    disableStatus: boolean,
    disableActionOnEmpty: boolean,
    handleEdit: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void,
    handleChangeStatus: (id: number) => void,
    handleAction: (id: number) => void
}
// modal not required
const TableRow = React.memo(({ todo, bootstrapButtonType, actionName, disableStatus, disableActionOnEmpty, handleAction, handleEdit, handleChangeStatus, }: ITableRowProps) => {
    const [focused, setFocused] = useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

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
            <td className='text-start'>
                <input
                    id={`inputTitle${todo.id}`}
                    type="text"
                    className="form-control"
                    style={isEmpty ? { borderColor: 'red', boxShadow: '0 0px 1rem 0.2rem rgba(255, 0, 0, 0.25)' } : {}}
                    defaultValue={todo.title}
                    disabled={todo.completed}
                    onFocus={() => {
                        setFocused(true);
                        setIsEmpty(false);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        setIsEmpty(e.target.value.trim() === "");
                        handleEdit(e, todo.id);
                    }}
                />
                {
                    isEmpty && <label htmlFor={`inputTitle${todo.id}`}><small className="text-danger">Title is required</small></label>
                }
            </td>
            <td>
                <button className="btn border-0" disabled={disableStatus || isEmpty} onClick={() => handleChangeStatus(todo.id)}>
                    <i className={classNames("fa fa-2x", todo.completed ? 'fa-check text-success' : 'fa-times text-danger')}></i>
                </button>
            </td>
            <td>
                <button className={classNames("btn", bootstrapButtonType, "w-75")}
                    disabled={focused || (disableActionOnEmpty && isEmpty)}
                    onClick={() => handleAction(todo.id)}>{actionName}</button>
            </td>
            <UserModal userId={selectedUserId} show={showModal} handleClose={handleCloseModal} />
        </tr>
    )
});

export default TableRow;
