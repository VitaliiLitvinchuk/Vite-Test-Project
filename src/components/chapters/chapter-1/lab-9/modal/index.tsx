import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IPhoneNumber } from "../types";

interface IPhoneWorkerModalProps {
    show: boolean
    phone: IPhoneNumber
    title: string
    handleClose: () => void
    handleSubmit: (phone: IPhoneNumber) => void
}

interface IErrorType {
    firstName: string
    lastName: string
    phone: string
}

const PhoneWorkerModal = ({ show, phone, title, handleClose, handleSubmit }: IPhoneWorkerModalProps) => {
    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newLastName, setNewLastName] = useState<string>("");
    const [newPhone, setNewPhone] = useState<string>("");
    const [error, setError] = useState<IErrorType>({ firstName: "", lastName: "", phone: "" });

    useEffect(() => {
        setNewFirstName(phone.firstName);
    }, [phone.firstName]);

    useEffect(() => {
        setNewLastName(phone.lastName);
    }, [phone.lastName]);

    useEffect(() => {
        setNewPhone(phone.phone);
    }, [phone.phone]);

    const close = useCallback(() => {
        handleClose();
        setNewFirstName("");
        setNewLastName("");
        setNewPhone("");
        setError({ firstName: "", lastName: "", phone: "" });
    }, [handleClose]);

    const submit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({ ...phone, firstName: newFirstName, lastName: newLastName, phone: newPhone });
        close();
    }, [handleSubmit, phone, newFirstName, newLastName, newPhone, close]);

    const handleEdit = useCallback((e: React.FocusEvent<HTMLInputElement>, name: string) => {
        if (e.target.value.trim() === "") {
            if (name === 'firstname')
                setError({ ...error, firstName: "The FirstName is required" });
            else if (name === 'lastname')
                setError({ ...error, lastName: "The LastName is required" });
            else if (name === 'phone')
                setError({ ...error, phone: "The Phone is required" });
            return;
        }

        if (name === 'firstname')
            setNewFirstName(e.target.value);
        else if (name === 'lastname')
            setNewLastName(e.target.value);
        else if (name === 'phone')
            setNewPhone(e.target.value);
    }, [error]);

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label htmlFor="firstname">FirstName</Form.Label>
                        <Form.Control id="firstname" type="text" defaultValue={newFirstName} onBlur={(e) => handleEdit(e, 'firstname')} />
                        {error && error['firstName'] && <Form.Text className="text-danger">{error['firstName']}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lastname">LastName</Form.Label>
                        <Form.Control id="lastname" type="text" defaultValue={newLastName} onBlur={(e) => handleEdit(e, 'lastname')} />
                        {error && error['lastName'] && <Form.Text className="text-danger">{error['lastName']}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="phone">Phone</Form.Label>
                        <Form.Control id="phone" type="text" defaultValue={newPhone} onBlur={(e) => handleEdit(e, 'phone')} />
                        {error && error['phone'] && <Form.Text className="text-danger">{error['phone']}</Form.Text>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={!!error.firstName || !!error.lastName || !!error.phone}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PhoneWorkerModal;