import { create } from 'zustand';

interface ToastState {
    show: boolean;
    message: string;
    variant: 'success' | 'danger' | 'warning' | 'info';
    showToast: (message: string, variant?: 'success' | 'danger' | 'warning' | 'info') => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    show: false,
    message: '',
    variant: 'info',
    showToast: (message, variant = 'info') => set({ show: true, message, variant }),
    hideToast: () => set({ show: false })
}));
