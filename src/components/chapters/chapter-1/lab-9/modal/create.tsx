import { useContext, useEffect, useState } from "react";
import { PhoneListContext } from "../context";
import { IPhoneNumber } from "../types";
import PhoneWorkerModal from ".";

const CreateModal = () => {
    const { nextIdPhone, addPhone } = useContext(PhoneListContext);
    const [phone, setPhone] = useState<IPhoneNumber>({ id: nextIdPhone, firstName: "", lastName: "", phone: "" });
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!show && phone.firstName && phone.lastName && phone.phone)
            addPhone(phone);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        setPhone({ id: nextIdPhone, firstName: "", lastName: "", phone: "" });
    }, [nextIdPhone]);

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
            <PhoneWorkerModal show={show} phone={phone} title='Create phone' handleClose={handleClose} handleSubmit={setPhone} />
        </>
    )
}

export default CreateModal;