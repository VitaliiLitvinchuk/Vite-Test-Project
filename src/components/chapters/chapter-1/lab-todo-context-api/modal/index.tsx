import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IChapterLab2ToDo } from "../../types";
import ModalForm, { IModalFormError, IValidation } from "../../../features/modal";

interface IToDoWorkerModalProps {
    show: boolean
    todo: IChapterLab2ToDo
    title: string
    handleClose: () => void
    handleSubmit: (todo: IChapterLab2ToDo) => void
}

interface IErrorType extends IModalFormError {
    title: string
}

const Fields = ['title'] as const;

const validation = {
    title: [{ func: (value: string) => value.trim().length > 0, message: "The {validationFor} is required" }] as IValidation[],
}

const names = [
    "Title",
];

const ToDoWorkerModal = ({ show, todo, title, handleClose, handleSubmit }: IToDoWorkerModalProps) => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<IErrorType>({ title: "" });

    useEffect(() => {
        setNewTitle(todo.title);
    }, [todo.title]);

    const setter = useMemo(() => {
        return [setNewTitle];
    }, []);

    const getter = useMemo(() => {
        return [newTitle];
    }, [newTitle]);

    return (
        <ModalForm
            show={show}
            title={title}
            getter={getter}
            setter={setter}
            error={error}
            validation={validation}
            names={names}
            fields={Fields}
            handleClose={handleClose}
            setError={setError as Dispatch<SetStateAction<IModalFormError>>}
            handleSubmit={(e) => handleSubmit({ ...todo, ...e as unknown as IChapterLab2ToDo })} />
    );
};

export default ToDoWorkerModal;