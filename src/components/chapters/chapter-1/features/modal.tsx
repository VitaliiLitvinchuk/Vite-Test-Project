import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface UserModalProps {
    userId: number | null
    show: boolean
    handleClose: () => void
}

interface User {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    },
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

const UserModal = ({ userId, show, handleClose }: UserModalProps) => {
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (userId !== null) {
            setLoading(true);
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        }
    }, [userId]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Information about user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Loading...</p>
                ) : userData ? (
                    <div>
                        <p><strong>ID:</strong> {userData.id}</p>
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Address:</strong> {`${userData.address.street}, ${userData.address.suite}, ${userData.address.city}`}</p>
                        <p><strong>Phone:</strong> {userData.phone}</p>
                        <p><strong>Site:</strong> {userData.website}</p>
                        <p><strong>Company:</strong> {userData.company.name}</p>
                    </div>
                ) : (
                    <p>Permission denied</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;