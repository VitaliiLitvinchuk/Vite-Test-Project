import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useToastStore } from '../store/useToastStore';

const GlobalToast: React.FC = () => {
    const { show, message, variant, hideToast } = useToastStore();

    return (
        <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
            <Toast 
                onClose={hideToast} 
                show={show} 
                delay={5000} 
                autohide 
                bg={variant}
                // The aria-live="polite" attribute ensures screen readers announce the toast 
                // when it appears without interrupting the user's current task.
                aria-live="polite" 
                aria-atomic="true"
            >
                <Toast.Header>
                    <strong className="me-auto">Сповіщення</strong>
                </Toast.Header>
                <Toast.Body className={variant === 'dark' ? 'text-white' : ''}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default GlobalToast;
