import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';

export const courseNotifications = {
    courseCreateToast,
    courseUpdateToast,
    courseExportToast,
};

const courseCreateMsg = () => (
    <span className="p-2">
        <FontAwesomeIcon icon={faCheck}/>&nbsp;
        Course created successfully
    </span>
);

function courseCreateToast() {
    toast.success(courseCreateMsg);
}

const courseUpdateMsg = () => (
    <span className="p-2">
        <FontAwesomeIcon icon={faInfo}/>&nbsp;
        Course updated successfully
    </span>
);

function courseUpdateToast() {
    toast.info(courseUpdateMsg);
}

const courseExportMsg = () => (
    <span className="p-2">
        <FontAwesomeIcon icon={faCheck}/>&nbsp;
        Course exported successfully
    </span>
);

function courseExportToast() {
    toast.success(courseExportMsg);
}
