import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);

    function addToast({ title = '', message = '', type = 'info', duration = 4000 }) {
        const id = Date.now() + Math.random().toString(36).substring(2, 9);
        const toast = {
            id,
            title,
            message,
            type,
            duration,
            createdAt: Date.now()
        };

        toasts.value.push(toast);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }

    function removeToast(id) {
        const index = toasts.value.findIndex(t => t.id === id);
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    }

    function success(message, title = 'Berhasil') {
        return addToast({ title, message, type: 'success' });
    }

    function error(message, title = 'Gagal') {
        return addToast({ title, message, type: 'error' });
    }

    function warning(message, title = 'Peringatan') {
        return addToast({ title, message, type: 'warning' });
    }

    function info(message, title = 'Informasi') {
        return addToast({ title, message, type: 'info' });
    }

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    };
});
