import { ReactNode, useCallback, useState } from 'react'
import { PhoneListContext } from './context';
import axios from 'axios';
import { IPhoneNumber } from './types';
import PhoneWorkerModal from './modal';
import CreateModal from './modal/create';
// import CreateModal from './modal/create';

const Provider = ({ children }: { children: ReactNode }) => {
    const [phoneList, setPhoneList] = useState<IPhoneNumber[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [nextIdPhone, setNextIdPhone] = useState<number>(1);

    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const [selectedPhone, setSelectedPhone] = useState<IPhoneNumber>({} as IPhoneNumber);

    const handleShowEditModal = useCallback((phone: IPhoneNumber) => {
        setSelectedPhone(phone);
        setShowEditModal(true);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setShowEditModal(false);
        setSelectedPhone({} as IPhoneNumber);
    }, []);

    const addPhone = useCallback((phone: IPhoneNumber) => {
        setPhoneList([phone, ...phoneList]);
        setNextIdPhone(nextIdPhone + 1);
    }, [phoneList, nextIdPhone]);

    const updatePhone = useCallback((phone: IPhoneNumber) => {
        setPhoneList(phoneList.map(t => (t.id === phone.id ? phone : t)));
    }, [phoneList]);

    const deletePhone = useCallback((id: number) => {
        setPhoneList(phoneList.filter(t => t.id !== id));
    }, [phoneList]);

    const initPhones = useCallback(async () => {
        if (phoneList.length === 0 && nextIdPhone === 1 && !fetching) {
            setFetching(true);
            setTimeout(async () => {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await axios.get<any>(`https://jsonplaceholder.typicode.com/users`).then(response => {
                        const list = [] as IPhoneNumber[];

                        for (let i = 0; i < response.data.length; i++) {
                            const fullname = response.data[i].name.split(' ');
                            list.unshift({ id: response.data[i].id, firstName: fullname[0], lastName: fullname[1], phone: response.data[i].phone });
                        }
                        setPhoneList(list);
                        setNextIdPhone(response.data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id)[0].id + 1);
                        setFetching(false);
                    });
                }
                finally {
                    setFetching(false);
                }
            }, 400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PhoneListContext.Provider
            value={{
                phoneList: phoneList,
                nextIdPhone: nextIdPhone,
                fetching: fetching,
                handleShowEditModal: handleShowEditModal,
                addPhone: addPhone,
                updatePhone: updatePhone,
                setNextIdPhone: setNextIdPhone,
                deletePhone: deletePhone,
                initPhones: initPhones
            }}>
            {children}
            <CreateModal />
            <PhoneWorkerModal show={showEditModal} phone={selectedPhone} title='Edit phone' handleClose={handleCloseEditModal} handleSubmit={updatePhone} />
        </PhoneListContext.Provider>
    )
};

export default Provider;