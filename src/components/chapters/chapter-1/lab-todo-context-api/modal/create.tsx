import { useContext, useEffect, useState } from "react";
import ToDoWorkerModal from ".";
import { IChapterLab2ToDo } from "../../types";
import { ToDoListContext } from "../context";

const CreateModal = () => {
    const { defaultUserId, nextIdToDo, addToDo } = useContext(ToDoListContext);
    const [todo, setTodo] = useState<IChapterLab2ToDo>({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!show && todo.title)
            addToDo(todo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        setTodo({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });
    }, [defaultUserId, nextIdToDo]);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                style={{
                    position: 'fixed',
                    top: '17%',
                    left: '25px',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <ToDoWorkerModal show={show} todo={todo} title='Edit' handleClose={handleClose} handleSubmit={setTodo} />
        </>
    )
}

export default CreateModal;