import React, { useContext } from "react";
import { PhoneListContext } from "../../context";
import { IPhoneNumber } from "../../types";

interface ITableDataProps {
    phone: IPhoneNumber,
}

const TableData = React.memo(({ phone }: ITableDataProps) => {
    const { deletePhone, handleShowEditModal } = useContext(PhoneListContext);

    return (
        <>
            <td>{phone.id}</td>
            <td className="text-start">{phone.firstName}</td>
            <td className="text-start">{phone.lastName}</td>
            <td>{phone.phone}</td>
            <td>
                <div className="d-flex gap-3">
                    <button className="btn btn-warning w-50" onClick={() => handleShowEditModal(phone)}>
                        Edit
                    </button>
                    <button className="btn btn-danger w-50" onClick={() => deletePhone(phone.id)}>
                        Delete
                    </button>
                </div>
            </td>
        </>
    )
})

export default TableData