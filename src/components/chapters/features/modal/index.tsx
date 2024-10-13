import React, { useCallback, useMemo } from "react";
import { Button, Form, Modal } from "react-bootstrap";

/**
 * Validation rule
 * @ {validationFor} - will replaced on name
 * @property {function(string): boolean} func - function to validate value
 * @property {string} message - error message if validation fails
 */
export interface IValidation {
    func: (value: string) => boolean
    message: string
}

export interface IModalFormError {
    [key: string]: string
}

export interface IFieldSpecifics {
    title: string
    type: "text" | "number" | "date"
}

interface IModalFormProps {
    show: boolean
    title: string
    getter: string[]
    setter: React.Dispatch<React.SetStateAction<string>>[]
    error: IModalFormError
    validation: { [key: string]: IValidation[] }
    specifics: IFieldSpecifics[]
    fields: readonly string[]
    setError: React.Dispatch<React.SetStateAction<IModalFormError>>
    handleSubmit: (data: Record<string, string>) => void
    handleClose: () => void
}
///////// magic
const ModalForm = React.memo(({ show, title, handleClose, getter, setter, error, setError, handleSubmit, validation, specifics, fields }: IModalFormProps) => {
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
        const fieldValidation = validation[field];

        if (fieldValidation) {
            for (const valid of fieldValidation) {
                if (!valid.func(value)) {
                    if (e !== null) {
                        e[field] = valid.message.replace("{validationFor}", specifics[fields.indexOf(field)].title);
                    } else {
                        setError({ ...error, [field]: valid.message.replace("{validationFor}", specifics[fields.indexOf(field)].title) });
                    }
                    return false;
                }
            }
        }

        setter[fields.indexOf(field)](value);
        setError({ ...error, [field]: "" });

        return true;
    }, [validation, fields, setter, setError, error, specifics]);

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body>
                    {
                        specifics.map((specific, index) => (
                            <Form.Group key={specific.title}>
                                <Form.Label htmlFor={specific.title}>{specific.title}</Form.Label>
                                <Form.Control id={specific.title}
                                    type={specific.type}
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
