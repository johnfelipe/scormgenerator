import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPause, faPlay, faTrashAlt, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../../services';
import ReactHtmlParser from 'react-html-parser';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// modal
import AltTagForm from '../../AlertModal/AltTagForm';

function ContentArea(props) {

    const { contentIndex, currentColumnContentIndex, currentColumn, uid } = props;
    const [modalShow, setModalShow] = useState(false);
    const [imgUrlPreview, setImgUrlPreview] = useState('');
    const [file, setFile] = useState('');
    const [fileIndex, setFileIndex] = useState('');
    const [play, setPlay] = useState(true);

    const handleImageChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            setImgUrlPreview(reader.result);
        }

        setModalShow(true);
        setFile(files);
        setFileIndex(0);
    }

    const handleImageUpload = (mediaAlt, file, fileIndex) => {
        if (modalShow ) { 
            const formData = new FormData();

            formData.append('file', file[fileIndex]);
            formData.append('uid', uid);
            formData.append('alt', mediaAlt);

            galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    console.log(fileObject);
                    setBackgroundImg(fileObject.name, fileObject.image);
                },
                error => console.log(error)
            );
        }
    }

    const setBackgroundImg = (name, url) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundImg.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name = name;

        props.setColumn(currentColumnObj);
    }

    const handleAudioChange = (e) => {
        let files = e.target.files;

        const formData = new FormData();

        formData.append('file', files[0]);
        formData.append('uid', uid);
        formData.append('alt', files[0].name);

        galleryService.uploadFiles(formData)
        .then(
            fileObject => {
                console.log(fileObject);
                setBackgroundMusic(fileObject.name, fileObject.image, fileObject.type);
            },
            error => console.log(error)
        );
    }

    const setBackgroundMusic = (name, url, type) => {
        const audioPlayer = document.getElementById("content-area-bg-audio");
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.name = name;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.type = type;

        props.setColumn(currentColumnObj);
        
        if (audioPlayer) {
            setPlay(true);
            audioPlayer.load();
        }
    }

    const bgAudioControl = () => {
        const audioPlayer = document.getElementById("content-area-bg-audio");

        if (audioPlayer) {
            if (play) {
                setPlay(false);
                audioPlayer.pause();
            } else {
                setPlay(true);
                audioPlayer.play();
            }
        }
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions border-top border-gray">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'contentArea')}>
                        <FontAwesomeIcon icon={faUndo}/>
                        <span>Reset</span>
                    </button>
                    <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => props.deleteFeature(contentIndex)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div className="sg-control sg-control-text-editor">
                <div className="sg-control-header d-flex justify-content-between">
                    <label>Content Setup</label>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => props.setShowEditor(true, contentIndex, 'contentArea')}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                </div>
                <div className="sg-control-input">
                    <div className="sg-expandable-rich-text">
                        <div className="sg-workspace-expander">
                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                <textarea
                                    className="resize-none"
                                    disabled 
                                    value={ 
                                        // typeof currentColumn != "undefined" &&
                                        // 'content' in currentColumn &&
                                        // currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        // currentColumnContentIndex in currentColumn.content &&
                                        // currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        // ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output)[0].props.children[0]
                                        // currentColumn.content[currentColumnContentIndex][contentIndex].output
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output !== '' ?
                                            typeof ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output)[0].props.children[0] !== 'object' ?
                                                ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output)[0].props.children[0]
                                            :
                                                'No information provided yet.'
                                        :
                                            'No information provided yet.'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Music</label>
                </div>
                <div className="sg-control-input sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Upload audio file for background music.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Audio</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn mb-0">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleAudioChange} accept="audio/*"/>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Upload audio"
                                    className="form-control w-50"
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.name
                                    }
                                    readOnly
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>This control is shown in the editor only.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Audio Controls</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input input-group">
                                {currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.url && 
                                    play ?
                                        <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='tooltip-top'>
                                                    <span>Pause the audio.</span>
                                                </Tooltip>
                                            }
                                        >
                                            {currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.url !== '' ?
                                                <span type="button" className="btn btn-primary" onClick={() => bgAudioControl()}>
                                                    <FontAwesomeIcon icon={faPause}/>
                                                </span>
                                            :
                                                <span type="button" className="btn btn-primary disabled">
                                                    <FontAwesomeIcon icon={faPause}/>
                                                </span>
                                            }
                                        </OverlayTrigger>
                                    :
                                        <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='tooltip-top'>
                                                    <span>Play the audio.</span>
                                                </Tooltip>
                                            }
                                        >
                                            {currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundAudio.url !== '' ?
                                                <span type="button" className="btn btn-primary" onClick={() => bgAudioControl()}>
                                                    <FontAwesomeIcon icon={faPlay}/>
                                                </span>
                                            :
                                                <span type="button" className="btn btn-primary disabled">
                                                    <FontAwesomeIcon icon={faPlay}/>
                                                </span>
                                            }
                                        </OverlayTrigger>
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Customize</label>
                </div>
                <div className="sg-control-input sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label">
                                <span>Background</span>
                            </div>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn mb-0">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleImageChange} accept="image/*"/>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Choose image"
                                    className="form-control w-50"
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name
                                    }
                                    readOnly
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>ID</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureId(event, contentIndex)}
                                    value={ 
                                        typeof currentColumn != "undefined" &&
                                        'content' in currentColumn &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumnContentIndex in currentColumn.content &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].id
                                    }
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Class</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureClass(event, contentIndex)}
                                    value={ 
                                        typeof currentColumn != "undefined" &&
                                        'content' in currentColumn &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumnContentIndex in currentColumn.content &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].class
                                    }
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Element CSS</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <div className="sg-expandable-code-editor">
                                    <div className="sg-workspace-expander">
                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowCssEditor(true, contentIndex)}>
                                                <span>Add CSS</span>
                                            </button>
                                            <input type="text" value="" disabled className="rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <AltTagForm
                imgUrlPreview={imgUrlPreview}
                file={file}
                fileIndex={fileIndex}
                handleImageUpload={handleImageUpload}
                modalShow={modalShow}
                setModalShow={setModalShow}
            />
        </div>
    )
}

export default ContentArea;
