import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faFileVideo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

function MediaLoader (props) {

    const {filterType, mediaFiles} = props;
    const [modalSHow, setModalShow] = useState(false);
    const [mediaName, setMediaName] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaAlt, setMediaAlt] = useState('');

    const itemClick = (itemId) => {
        const elem = document.getElementById(itemId);
        const prevItemId = localStorage.getItem('prevItemId');

        if (((prevItemId === null) || (prevItemId !== null)) && (elem !== null)) {
            localStorage.setItem('prevItemId', itemId);
            elem.focus();
            elem.classList.add("details");
            elem.classList.add("selected");
        } 

        if ((prevItemId !== itemId) && (prevItemId !== null)) {
            const prevElem = document.getElementById(prevItemId);

            if (prevElem !== null) {
                prevElem.classList.remove("details");
                prevElem.classList.remove("selected");
            }
        }
    }

    const content = (filterType, mediaFiles) => {
        if (filterType === "all") {
            return (
                mediaFiles.map((fileData, fileIndex) => (
                    fileData.type.includes("image") ?
                        <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                            <div
                                className="media-preview"
                                onClick={() => {
                                    itemClick('item-' + fileIndex);
                                    setMediaName(fileData.name);
                                    setMediaUrl(fileData.url);
                                    setMediaAlt(fileData.alt);
                                    setModalShow(true);
                                }}
                            >
                                <div className="thumbnail">
                                    <div className="centered">
                                        <img src={fileData.url} alt={fileData.name}/>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="check" onClick={() => props.deleteMedia(fileIndex)}>
                                <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                            </button>
                        </li>
                    :
                        fileData.type.includes("audio") ?
                            <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                                <div
                                    className="media-preview"
                                    onClick={() => {
                                        itemClick('item-' + fileIndex);
                                        setMediaName(fileData.name);
                                        setMediaUrl(fileData.url);
                                        setMediaAlt(fileData.alt);
                                        setModalShow(true);
                                    }}
                                >
                                    <div className="thumbnail">
                                        <FontAwesomeIcon icon={faFileAudio} className="w-100 h-40 mt-3"/>
                                        <div className="audio">
                                            <div>{fileData.name}</div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="check" onClick={() => props.deleteMedia(fileIndex)}>
                                    <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                </button>
                            </li>
                        :
                            <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                                <div
                                    className="media-preview"
                                    onClick={() => {
                                        itemClick('item-' + fileIndex);
                                        setMediaName(fileData.name);
                                        setMediaUrl(fileData.url);
                                        setMediaAlt(fileData.alt);
                                        setModalShow(true);
                                    }}
                                >
                                    <div className="thumbnail">
                                        <FontAwesomeIcon icon={faFileVideo} className="w-100 h-40 mt-3"/>
                                        <div className="video">
                                            <div>{fileData.name}</div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="check" onClick={() => props.deleteMedia(fileIndex)}>
                                    <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                </button>
                            </li>
                
                ))
            );
        } else if (filterType === "image") {
            return (
                mediaFiles.map((fileData, fileIndex) => (
                    fileData.type.includes("image") &&
                        <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                            <div
                                className="media-preview"
                                onClick={() => {
                                    itemClick('item-' + fileIndex);
                                    setMediaName(fileData.name);
                                    setMediaUrl(fileData.url);
                                    setMediaAlt(fileData.alt);
                                    setModalShow(true);
                                }}
                            >
                                <div className="thumbnail">
                                    <div className="centered">
                                        <img src={fileData.url} alt={fileData.name}/>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="check" onClick={() => props.deleteMedia(fileIndex)}>
                                <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                            </button>
                        </li>
                ))
            );
        } else if (filterType === "audio") {
            return (
                mediaFiles.map((fileData, fileIndex) => (
                    fileData.type.includes("audio") &&
                        <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                            <div
                                className="media-preview"
                                onClick={() => {
                                    itemClick('item-' + fileIndex);
                                    setMediaName(fileData.name);
                                    setMediaUrl(fileData.url);
                                    setMediaAlt(fileData.alt);
                                    setModalShow(true);
                                }}
                            >
                                <div className="thumbnail">
                                    <FontAwesomeIcon icon={faFileAudio} className="w-100 h-40 mt-3"/>
                                    <div className="audio">
                                        <div>{fileData.name}</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="check" onClick={() => props.deleteMedia(fileIndex)}>
                                <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                            </button>
                        </li>
                ))
            );
        } else if (filterType === "video") {
            return (
                mediaFiles.map((fileData, fileIndex) => (
                    fileData.type.includes("video") &&
                        <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                            <div
                                className="media-preview"
                                onClick={() => {
                                    itemClick('item-' + fileIndex);
                                    setMediaName(fileData.name);
                                    setMediaUrl(fileData.url);
                                    setMediaAlt(fileData.alt);
                                    setModalShow(true);
                                }}
                            >
                                <div className="thumbnail">
                                    <FontAwesomeIcon icon={faFileAudio} className="w-100 h-40 mt-3"/>
                                    <div className="video">
                                        <div>{fileData.name}</div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="check" onClick={() => props.deleteMedia(fileIndex)}>
                                <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                            </button>
                        </li>
                ))
            );
        }
    }

    const mediaModal = (
        <Modal
            show={modalSHow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="gallery-preview-modal w-80"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {mediaName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={mediaUrl} alt={mediaAlt} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={() => setModalShow(false)}>Close</button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <ul className="media-library-list w-100">
            {content(filterType, mediaFiles)}
            {mediaModal}
        </ul>
    )
}

export default MediaLoader;