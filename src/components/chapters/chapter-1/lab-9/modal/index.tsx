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

const PhoneWorkerModal = ({ show, phone, title, handleClose, handleSubmit }: IPhoneWorkerModalProps) => {
    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newLastName, setNewLastName] = useState<string>("");
    const [newPhone, setNewPhone] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

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
        setError({});
    }, [handleClose]);

    const submit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({ ...phone, firstName: newFirstName, lastName: newLastName, phone: newPhone });
        close();
    }, [handleSubmit, phone, newFirstName, newLastName, newPhone, close]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = useCallback((e: any, name: string) => {
        if (e.target.value.trim() === "") {
            if (name === 'firstname')
                setError({ ...error, firstname: "FirstName cannot be empty" });
            else if (name === 'lastname')
                setError({ ...error, lastname: "LastName cannot be empty" });
            else if (name === 'phone')
                setError({ ...error, phone: "Phone cannot be empty" });
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
                        {error && error['firstname'] && <Form.Text className="text-danger">{error['firstname']}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lastname">LastName</Form.Label>
                        <Form.Control id="lastname" type="text" defaultValue={newLastName} onBlur={(e) => handleEdit(e, 'lastname')} />
                        {error && error['lastname'] && <Form.Text className="text-danger">{error['lastname']}</Form.Text>}
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
                    <Button variant="primary" type="submit" disabled={!!error}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PhoneWorkerModal;