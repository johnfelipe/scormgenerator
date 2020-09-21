import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faFileVideo, faTrash, faClone, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import { Player, ControlBar } from 'video-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { galleryActions } from '../../actions';
import { galleryService } from '../../services';
import { useDispatch } from 'react-redux';

function MediaLoader (props) {

    const dispatch = useDispatch();
    const {filterType, mediaFiles, uid} = props;
    const [modalShow, setModalShow] = useState(false);
    const [mediaName, setMediaName] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaAlt, setMediaAlt] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [mediaVtt, setMediaVtt] = useState('');
    const [copied, setCopied] = useState(false);

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

    const handleFileUpload = (e) => {
        let files = e.target.files;
        console.log(files);

        const formData = new FormData();

        formData.append('file', files[0]);
        formData.append('uid', uid);
        formData.append('alt', files[0].name);

        galleryService.uploadFiles(formData)
        .then(
            fileObject => {
                console.log(fileObject);
                dispatch(galleryActions.updateFile(fileObject.fid, fileObject.url, fileObject.name));
                setMediaVtt(fileObject.url);
            },
            error => console.log(error)
        );
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
                                    setMediaType(fileData.type);
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
                                        setMediaType(fileData.type);
                                    }}
                                >
                                    <div className="thumbnail webupps-vertical-center-v2">
                                        <FontAwesomeIcon icon={faFileAudio} className="w-100 h-40"/>
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
                                        setMediaType(fileData.type);
                                        setMediaVtt(fileData.vtt);
                                    }}
                                >
                                    <div className="thumbnail webupps-vertical-center-v2">
                                        <FontAwesomeIcon icon={faFileVideo} className="w-100 h-40"/>
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
                                    setMediaType(fileData.type);
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
                                    setMediaType(fileData.type);
                                }}
                            >
                                <div className="thumbnail webupps-vertical-center-v2">
                                    <FontAwesomeIcon icon={faFileAudio} className="w-100 h-40"/>
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
                                    setMediaType(fileData.type);
                                    setMediaVtt(fileData.vtt);
                                }}
                            >
                                <div className="thumbnail webupps-vertical-center-v2">
                                    <FontAwesomeIcon icon={faFileAudio} className="w-100 h-40"/>
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

    const clearCopiedMessage = () => {
        setTimeout(
            function() {
                setCopied(false);
            },
            5000
        );
    }

    const mediaModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="gallery-preview-modal w-50"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {mediaName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mediaType.includes("image") ?
                    <div className="text-center">
                    {/* <div className="row m-0">
                        <div className="col-md-8">

                        </div>
                    </div> */}
                        <div className="form-inline justify-content-center mb-2">
                            {copied &&
                                <label className="form-check-label text-success mr-2 mb-2">Url copied to clipboard!</label>
                            }
                            <input
                                type="text"
                                defaultValue={mediaUrl}
                                className="form-control mr-sm-2 w-40"
                                readOnly
                            />
                            <CopyToClipboard onCopy={setCopied} text={mediaUrl}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        clearCopiedMessage();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faClone}/>
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className="form-inline justify-content-center mb-2">
                            <label className="form-check-label mr-2">Alt: </label>
                            <input
                                type="text"
                                defaultValue={mediaAlt}
                                className="form-control w-40"
                                style={{ marginRight: '40px' }}
                            />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    clearCopiedMessage();
                                }}
                                style={{ visibility: 'hidden' }}
                            >
                                <FontAwesomeIcon icon={faClone}/>
                            </button>
                        </div>
                        <img src={mediaUrl} alt={mediaAlt} className="w-70 h-auto" />
                    </div>
                :
                    mediaType.includes("audio") ?
                        <div className="text-center">
                            <div>
                                <ReactAudioPlayer
                                    src={mediaUrl}
                                    controls
                                    title={mediaName}
                                />
                            </div>
                            <div>
                                {copied &&
                                    <label className="form-check-label text-success mr-2 mb-2">Url copied to clipboard!</label>
                                }
                                <textarea 
                                    value={
                                        '<audio controls><source src="' + mediaUrl + '" type="' + mediaType + '">Your browser does not support the audio tag.</audio>'
                                    }
                                    className="webupps-resize-none w-100 webupps-audio-code-sharing code webupps-monospace"
                                    style={{ height: '100px' }}
                                    readOnly
                                />
                                <CopyToClipboard
                                    onCopy={setCopied}
                                    text={
                                        '<audio controls><source src="' + mediaUrl + '" type="' + mediaType + '">Your browser does not support the audio tag.</audio>'
                                    }
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100 mb-2"
                                        onClick={() => {
                                            clearCopiedMessage();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faClone}/>
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    :
                        mediaType.includes("video") &&
                            <div className="text-center">
                                <div>
                                    <Player>
                                        <source src={mediaUrl} />
                                        <ControlBar autoHide={true}/>
                                    </Player>
                                </div>
                                <div>
                                    {copied &&
                                        <label className="form-check-label text-success mr-2 mb-2">Url copied to clipboard!</label>
                                    }
                                    <div className="row m-0 mb-2 mt-2">
                                        <div className="col-md-1 webupps-vertical-center justify-content-center">
                                            <span>VTT:</span>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <label className="input-group-btn form-inline m-0 float-right">
                                                <span className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faUpload}/><input type="file" onChange={(e) => handleFileUpload(e)} style={{ display: "none"}} accept=".vtt"/>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="col-md-10 p-0 pl-1">
                                            <input type="text" placeholder="Choose vtt file" className="form-control" value={mediaVtt} readOnly/>
                                        </div>
                                    </div>
                                    <textarea 
                                        value={
                                            mediaVtt ?
                                                '<video id="sample_video" width="800" height="600" controls><source src="' + mediaUrl + '" type="' + mediaType + '"><track label="English" kind="subtitles" srclang="en" src="' + mediaVtt + '" default></video>'
                                            :
                                                '<video id="sample_video" width="800" height="600" controls><source src="' + mediaUrl + '" type="' + mediaType + '"></video>'
                                        }
                                        className="webupps-resize-none w-100 webupps-video-code-sharing code webupps-monospace"
                                        style={{ height: '100px' }}
                                        readOnly
                                    />
                                    <CopyToClipboard
                                        onCopy={setCopied}
                                        text={
                                            mediaVtt ?
                                                '<video id="sample_video" width="800" height="600" controls><source src="' + mediaUrl + '" type="' + mediaType + '"><track label="English" kind="subtitles" srclang="en" src="' + mediaVtt + '" default></video>'
                                            :
                                                '<video id="sample_video" width="800" height="600" controls><source src="' + mediaUrl + '" type="' + mediaType + '"></video>'
                                        }
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100"
                                            onClick={() => {
                                                clearCopiedMessage();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faClone}/>
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                }
            </Modal.Body>
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