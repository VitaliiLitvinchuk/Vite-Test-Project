/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { IPhoneNumber, PhoneContext } from "./types";

export const PhoneListContext = createContext<PhoneContext>({
    phoneList: [],
    nextIdPhone: 1,
    fetching: false,
    handleShowEditModal: (_phone: IPhoneNumber) => { },
    setNextIdPhone: (_nextIdPhone: number) => { },
    updatePhone: (_phone: IPhoneNumber) => { },
    addPhone: (_phone: IPhoneNumber) => { },
    deletePhone: (_id: number) => { },
    initPhones: () => { }
});