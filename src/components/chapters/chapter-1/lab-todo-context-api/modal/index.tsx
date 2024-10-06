import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IChapterLab2ToDo } from "../../types";

interface IToDoWorkerModalProps {
    show: boolean
    todo: IChapterLab2ToDo
    title: string
    handleClose: () => void
    handleSubmit: (todo: IChapterLab2ToDo) => void
}

const ToDoWorkerModal = ({ show, todo, title, handleClose, handleSubmit }: IToDoWorkerModalProps) => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setNewTitle(todo.title);
    }, [todo.title]);

    const close = useCallback(() => {
        handleClose();
        setNewTitle("");
        setError("");
    }, [handleClose]);

    const submit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({ ...todo, title: newTitle });
        close();
    }, [newTitle, todo, handleSubmit, close]);

    const handleEdit = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === "") {
            setError("Title cannot be empty");
            return;
        }
        else
            setError("");

        setNewTitle(e.target.value);
    }, []);

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control id="title" type="text" defaultValue={newTitle} onChange={handleEdit} />
                        {error && <Form.Text className="text-danger">{error}</Form.Text>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={!!error}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ToDoWorkerModal;