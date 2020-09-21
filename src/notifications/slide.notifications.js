import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';

export const slideNotifications = {
    slideCreateToast,
    slideUpdateToast,
};

const slideCreateMsg = () => (
    <span className="p-2">
        <FontAwesomeIcon icon={faCheck}/>&nbsp;
        Slide created successfully
    </span>
);
function slideCreateToast() {
    toast.success(slideCreateMsg);
}

const slideUpdateMsg = () => (
    <span className="p-2">
        <FontAwesomeIcon icon={faInfo}/>&nbsp;
        Slide updated successfully
    </span>
);
function slideUpdateToast() {
    toast.info(slideUpdateMsg);
}
