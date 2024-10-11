import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IPhoneNumber } from "../types";

////// Change on copy-paste
interface IPhoneWorkerModalProps {
    show: boolean
    phone: IPhoneNumber
    title: string
    handleClose: () => void
    handleSubmit: (phone: IPhoneNumber) => void
}

interface IErrorType {
    [key: string]: string
    firstName: string
    lastName: string
    phone: string
}

enum Fields {
    'firstName',
    'lastName',
    'phone'
}
interface IValidation {
    func: (value: string) => boolean
    message: string
}

const validations = {
    firstName: [{ func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" }] as IValidation[],
    lastName: [{ func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" }] as IValidation[],
    phone: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => /^\+380\d{9}$/.test(value), message: "The phone number should be in format +380XXXXXXXXX" },
    ] as IValidation[],
}

const names = [
    "First Name",
    "Last Name",
    "Phone"
];
//////

const PhoneWorkerModal = ({ show, phone, title, handleClose, handleSubmit }: IPhoneWorkerModalProps) => {
    ////// Change on copy-paste
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

    const setter = useMemo(() => {
        return [setNewFirstName, setNewLastName, setNewPhone];
    }, []);

    const getter = useMemo(() => {
        return [newFirstName, newLastName, newPhone];
    }, [newFirstName, newLastName, newPhone]);
    //////
    const typeValues = useMemo(() => {
        const values = Object.values(Fields);
        return values.slice(0, values.length / 2);
    }, []);

    const close = useCallback(() => {
        handleClose();
        setter.forEach(set => set(""));
        const data = typeValues.reduce((acc, value) => {
            acc[value] = "";
            return acc;
        }, {} as Record<string, string>)
        setError({ ...error, ...data });
    }, [error, handleClose, setter, typeValues]);

    const submit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let validation = true;
        const tempError = { ...error } as IErrorType;

        typeValues.forEach((_value, index) => {
            validation = handleEdit(getter[index], Fields[Fields[index] as keyof typeof Fields], tempError) && validation;
        });

        setError(tempError);

        if (validation) {
            const data = typeValues.reduce((acc, value, index) => {
                acc[value] = getter[index];
                return acc;
            }, {} as Record<string, string>);
            handleSubmit({ ...phone, ...data });
            close();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSubmit, phone, close]);

    const handleEdit = useCallback((value: string, field: Fields, e: IErrorType | null = null) => {
        const fieldName = Fields[field];
        const validation = validations[Fields[field] as keyof typeof Fields];

        if (validation) {
            for (const valid of validation) {
                if (!valid.func(value)) {
                    if (e !== null)
                        e[fieldName] = valid.message.replace("{validationFor}", names[field]);
                    else
                        setError({ ...error, [fieldName]: valid.message.replace("{validationFor}", names[field]) });
                    return false;
                }
            }
        }

        setter[field](value);
        setError({ ...error, [fieldName]: "" });

        return true;
    }, [error, setter]);

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body>
                    {
                        names.map((name, index) => (
                            <Form.Group key={name}>
                                <Form.Label htmlFor={name}>{name}</Form.Label>
                                <Form.Control id={name}
                                    type="text"
                                    defaultValue={getter[index]}
                                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleEdit(e.target.value, Fields[Fields[index] as keyof typeof Fields])}
                                />
                                {error[Fields[index]] && <Form.Text className="text-danger">{error[Fields[index]]}</Form.Text>}
                            </Form.Group>
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={Object.values(error).some((value) => !!value)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PhoneWorkerModal;