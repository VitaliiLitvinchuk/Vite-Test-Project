import React, { useCallback, useMemo } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export interface IValidation {
    func: (value: string) => boolean
    message: string
}

export interface IModalFormError {
    [key: string]: string
}

interface IModalFormProps {
    show: boolean
    title: string
    getter: string[]
    setter: React.Dispatch<React.SetStateAction<string>>[]
    error: IModalFormError
    validation: { [key: string]: IValidation[] }
    names: string[]
    fields: readonly string[]
    setError: React.Dispatch<React.SetStateAction<IModalFormError>>
    handleSubmit: (data: Record<string, string>) => void
    handleClose: () => void
}

const ModalForm = React.memo(({ show, title, handleClose, getter, setter, error, setError, handleSubmit, validation, names, fields }: IModalFormProps) => {
    type FieldsType = typeof fields[number];
    const typeValues = useMemo(() => {
        return fields;
    }, [fields]);

    const close = useCallback(() => {
        handleClose();
        setter.forEach(set => set(""));
        const data = typeValues.reduce((acc, value) => {
            acc[value] = "";
            return acc;
        }, {} as Record<string, string>);
        setError({ ...error, ...data });
    }, [error, handleClose, setter, typeValues, setError]);

    const submit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;
        const tempError = { ...error } as IModalFormError;

        typeValues.forEach((_value, index) => {
            isValid = handleEdit(getter[index], fields[index], tempError) && isValid;
        });

        setError(tempError);

        if (isValid) {
            const data = typeValues.reduce((acc, value, index) => {
                acc[value] = getter[index];
                return acc;
            }, {} as Record<string, string>);
            handleSubmit(data);
            close();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, typeValues, setError, getter, fields, handleSubmit, close]);

    const handleEdit = useCallback((value: string, field: FieldsType, e: IModalFormError | null = null) => {
        const fieldName = field;
        const fieldValidation = validation[field];

        if (fieldValidation) {
            for (const valid of fieldValidation) {
                if (!valid.func(value)) {
                    if (e !== null) {
                        e[fieldName] = valid.message.replace("{validationFor}", names[fields.indexOf(field)]);
                    } else {
                        setError({ ...error, [fieldName]: valid.message.replace("{validationFor}", names[fields.indexOf(field)]) });
                    }
                    return false;
                }
            }
        }

        setter[fields.indexOf(field)](value);
        setError({ ...error, [fieldName]: "" });

        return true;
    }, [validation, fields, setter, setError, error, names]);

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
                                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleEdit(e.target.value, fields[index])}
                                />
                                {error[fields[index]] && <Form.Text className="text-danger">{error[fields[index]]}</Form.Text>}
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
});

export default ModalForm;
