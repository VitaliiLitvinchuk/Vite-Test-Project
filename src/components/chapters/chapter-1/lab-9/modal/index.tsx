import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IPhoneNumber } from "../types";
import ModalForm, { IModalFormError, IValidation } from '../../../features/modal/index';
import { IFieldSpecifics } from '../../../features/modal/index';

interface IPhoneWorkerModalProps {
    show: boolean
    phone: IPhoneNumber
    title: string
    handleClose: () => void
    handleSubmit: (phone: IPhoneNumber) => void
}

interface IErrorType extends IModalFormError {
    firstName: string
    lastName: string
    phone: string
}

const fields = ['firstName', 'lastName', 'phone'] as const;

const validation = {
    firstName: [{ func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" }] as IValidation[],
    lastName: [{ func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" }] as IValidation[],
    phone: [
        { func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" },
        { func: (value: string) => /^\+380\d{9}$/.test(value), message: "The phone number should be in format +380XXXXXXXXX" },
    ] as IValidation[],
}

const specifics = [
    { title: "First Name" },
    { title: "Last Name" },
    { title: "Phone" },
] as IFieldSpecifics[];

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

    const setter = useMemo(() => {
        return [setNewFirstName, setNewLastName, setNewPhone];
    }, []);

    const getter = useMemo(() => {
        return [newFirstName, newLastName, newPhone];
    }, [newFirstName, newLastName, newPhone]);

    return (
        <ModalForm
            show={show}
            title={title}
            getter={getter}
            setter={setter}
            error={error}
            validation={validation}
            specifics={specifics}
            fields={fields}
            handleClose={handleClose}
            setError={setError as Dispatch<SetStateAction<IModalFormError>>}
            handleSubmit={(e) => handleSubmit({ ...phone, ...e as unknown as IPhoneNumber })} />
    )
};

export default PhoneWorkerModal;