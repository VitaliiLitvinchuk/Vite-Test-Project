import React from 'react';
import { Spinner } from 'react-bootstrap';

interface AccessibleLoaderProps {
    message?: string;
}

const AccessibleLoader: React.FC<AccessibleLoaderProps> = ({ message = "Завантаження даних..." }) => {
    return (
        <div 
            className="d-flex justify-content-center align-items-center p-4"
            // role="status" and aria-live="polite" indicate to screen readers 
            // that this is a status update that should be announced
            role="status"
            aria-live="polite"
        >
            <Spinner animation="border" role="presentation" aria-hidden="true" />
            <span className="visually-hidden">{message}</span>
        </div>
    );
};

export default AccessibleLoader;
