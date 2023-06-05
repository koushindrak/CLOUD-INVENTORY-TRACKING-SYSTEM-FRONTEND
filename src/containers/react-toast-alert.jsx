// common-files/toast.js
import { toast } from 'react-toastify';

const toastOptions = {
    success: {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
    },
    error: {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
    },
};

export function successToast(message) {
    toast(message, toastOptions.success);
}

export function errorToast(message) {
    toast(message, toastOptions.error);
}
