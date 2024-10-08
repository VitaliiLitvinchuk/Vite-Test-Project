
export interface IPhoneNumber {
    id: number,
    firstName: string,
    lastName: string,
    phone: string
}

export interface PhoneContext {
    phoneList: IPhoneNumber[]
    nextIdPhone: number
    fetching: boolean
    handleShowEditModal: (_Phone: IPhoneNumber) => void
    addPhone: (phone: IPhoneNumber) => void
    updatePhone: (phone: IPhoneNumber) => void
    setNextIdPhone: (nextIdPhone: number) => void
    deletePhone: (_id: number) => void
    initPhones: () => void
};