import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';

export const lessonNotifications = {
    lessonCreateToast,
    lessonUpdateToast,
};

const leesonCreateMsg = () => (
    <span className="p-2">
        <FontAwesomeIcon icon={faCheck}/>&nbsp;
        Lesson created successfully
    </span>
);
function lessonCreateToast() {
    toast.success(leesonCreateMsg);
}

const lessonUpdateMsg = () => (
    <span className="p-2">
        <FontAwesomeIcon icon={faInfo}/>&nbsp;
        Lesson updated successfully
    </span>
);
function lessonUpdateToast() {
    toast.info(lessonUpdateMsg);
}
