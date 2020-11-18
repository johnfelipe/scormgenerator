import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUndo, faUpload, faPause, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../../../services';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import ColorPicker from '../../../Common/ColorPicker';
import ColorPickerBg from '../../../Common/ColorPicker';
import ColorPickerModalBtn from '../../../Common/ColorPicker';
import AltTagForm from '../../../AlertModal/AltTagForm';
import ContentWithPictureAccordion from './ContentWithPictureAccordion';

function ContentWithPicture(props) {
    
    const { contentIndex, currentColumnContentIndex, currentColumn, uid } = props;
    const [showPickerBg, setShowPickerBg] = useState(false);
    const [showPickerModalBtn, setShowPickerModalBtn] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [imgUrlPreview, setImgUrlPreview] = useState('');
    const [file, setFile] = useState('');
    const [fileIndex, setFileIndex] = useState('');
    const [play, setPlay] = useState(true);
    const [modalTitle, setModalTitle] = useState('');
    const [updateModalCompareIndex, setUpdateModalCompareIndex] = useState('');
    const [isEditModalTitle, setIsEditModalTitle] = useState(false);
    const [updateTitle, setUpdateTitle] = useState('');
    const currentBackgroundColor = currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundColor;
    const currentModalBtnColor = currentColumn.content[currentColumnContentIndex][contentIndex].style.modalBtnColor;
    const titleTextColor = currentColumn.content[currentColumnContentIndex][contentIndex].style.titleTextColor && currentColumn.content[currentColumnContentIndex][contentIndex].style.titleTextColor;
    const titleBoxColor = currentColumn.content[currentColumnContentIndex][contentIndex].style.titleBoxColor && currentColumn.content[currentColumnContentIndex][contentIndex].style.titleBoxColor;
    const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
    const [showTextColorPicker, setShowTextColorPicker] = useState(false);

    const setImage = (name, url) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.image.name = name;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.image.url = url;

        props.setColumn(currentColumnObj);
    }

    const handleImageChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            // setImage(files[0].name, reader.result, files[0].type);
            setImgUrlPreview(reader.result);
        }

        setModalShow(true);
        setFile(files);
        setFileIndex(0);
    }

    const handleImageUpload = (mediaAlt, file, fileIndex) => {
        if (modalShow) { 
            const formData = new FormData();

            formData.append('file', file[fileIndex], file[fileIndex].name.replace(/\s/g,''));
            formData.append('uid', uid);
            formData.append('alt', mediaAlt);

            galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    console.log(fileObject);
                    setImage(fileObject.name, fileObject.image, fileObject.image);
                    setImgAlt(fileObject.alt);
                },
                error => console.log(error)
            );
        }
    }

    const setImgAlt = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.image.alt = value;

        props.setColumn(currentColumnObj);
    }

    const setBackgroundColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundColor = color;

        props.setColumn(currentColumnObj);
    }

    const setTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.textColor = color;

        props.setColumn(currentColumnObj);
    }

    const setImgPosition = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.imgPosition = value;

        props.setColumn(currentColumnObj);
    }

    const setLayout = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.layout = value;

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
        const audioPlayer = document.getElementById("content-picture-bg-audio");
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
        const audioPlayer = document.getElementById("content-picture-bg-audio");

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

    const addContentModal = (value) => {
        const currentColumnObj = currentColumn;

        const modal = {
            title: value,
            content: '',
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.modal.push(modal);

        props.setColumn(currentColumnObj);
    }

    const setModalPosition = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.modalPosition = value;

        props.setColumn(currentColumnObj);
    }

    const editModaTitle = (value, index) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.modal[index].title = value;

        props.setColumn(currentColumnObj);
    }

    const setModalBtnColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.modalBtnColor = color;

        props.setColumn(currentColumnObj);
    }

    const setModalBtnTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.modalBtnTextColor = color;

        props.setColumn(currentColumnObj);
    }

    const setTitleBorder = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.titleBoxBorder = e.target.value;

        props.setColumn(currentColumnObj);
    }

    const setTitleTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.titleTextColor = color;

        props.setColumn(currentColumnObj);
    }

    const setTitleBoxColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.titleBoxColor = color;

        props.setColumn(currentColumnObj);
    }
    
    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions border-top border-gray">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'contentPicture')}>
                        <FontAwesomeIcon icon={faUndo}/>
                        <span>Reset</span>
                    </button>
                    <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => props.deleteFeature(contentIndex)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Image Setup</label>
                </div>
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label">
                                <span>Image</span>
                            </div>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleImageChange} accept="image/*"/>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Choose image"
                                    className="form-control w-50"
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.image.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.image.name
                                    }
                                    readOnly
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-text-editor">
                <div className="sg-control-header d-flex justify-content-between">
                    <label>Body Text</label>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => props.setShowEditor(true, contentIndex, 'contentPicture')}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                </div>
                <div className="sg-control-input">
                    <div className="sg-expandable-rich-text">
                        <div className="sg-workspace-expander">
                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                {/* <textarea
                                    className="webupps-resize-none"
                                    disabled 
                                    value={ 
                                        // typeof currentColumn != "undefined" &&
                                        // 'content' in currentColumn &&
                                        // currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        // currentColumnContentIndex in currentColumn.content &&
                                        // currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        // currentColumn.content[currentColumnContentIndex][contentIndex].output.content
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.content !== '' ?
                                            typeof ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.content)[0].props.children[0] !== 'object' ?
                                                ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.content)[0].props.children[0]
                                            :
                                                'No information provided yet.'
                                        :
                                            'No information provided yet.'
                                    }
                                /> */}
                                <div className="webupps-custom-disabled-textarea webupps-resize-none">
                                    {currentColumn.content[currentColumnContentIndex].length > 0 &&
                                    currentColumnContentIndex in currentColumn.content &&
                                    currentColumn.content[currentColumnContentIndex].length > 0 &&
                                    ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.content)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Modal/s Setup</label>
                </div>
                <div className="sg-control-input sg-control-input content-picture-modal-setup">
                    <ul className="sg-control-input-list content-picture-modal-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-modal">
                            <OverlayTrigger
                                key="content-with-picture-modal-position-top"
                                placement="top"
                                overlay={
                                    <Tooltip id='content-with-picture-modal-position-tooltip-top'>
                                        <span>
                                            Choose position for the modal
                                        </span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Position</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.modalPosition}
                                    onChange={(event) => setModalPosition(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="top-right">&nbsp;Top-right</option>
                                    <option value="bottom-right">&nbsp;Bottom-right</option>
                                    <option value="top-left">&nbsp;Top-left</option>
                                    <option value="bottom-left">&nbsp;Bottom-left</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-modal">
                            <div className="sg-control-input-list-label content-picture-background-color-label">
                                <span>Background Color</span>
                            </div>
                            <div className="sg-control-input-list-input content-picture-background-color-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showPickerModalBtn ? setShowPickerModalBtn(false) : setShowPickerModalBtn(true)} style={{ background: currentModalBtnColor, cursor: 'pointer' }}>
                                    {currentModalBtnColor !== 'transparent' && currentModalBtnColor !== '' ?
                                        <span className="text-white h-100 w-100">{currentModalBtnColor}</span>
                                    :
                                        <span className="text-black h-100 w-100">TRANSPARENT</span>
                                    }
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-modal mb-3">
                            <div className="sg-control-input-list-label">
                                <span>Text Color</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.modalBtnTextColor}
                                    onChange={(event) => setModalBtnTextColor(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="text-black">&nbsp;Black</option>
                                    <option value="text-white">&nbsp;White</option>
                                </select>
                            </div>
                        </li>
                        {currentColumn.content[currentColumnContentIndex][contentIndex].output.modal.length > 0 ? 
                            <>
                                {currentColumn.content[currentColumnContentIndex][contentIndex].output.modal.map((modalItem, modalIndex) => (
                                    <li key={'content-picture-modal-' + modalIndex} className="content-picture-modal-list-item mb-2">
                                        {isEditModalTitle && updateModalCompareIndex === modalIndex ?
                                            <div className="content-picture-modal-input-wrapper">
                                                <div className="content-picture-modal-input-label">
                                                    <span>{modalIndex+1}.</span>
                                                </div>
                                                <div className="content-picture-modal-input">
                                                    <input
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                        placeholder="Type title here. . ."
                                                        onChange={(event) => setUpdateTitle(event.target.value)}
                                                        value={updateTitle}
                                                    />
                                                </div>
                                                <div className="content-picture-modal-button">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => {
                                                            const isEmpty = document.getElementById("title");
                                                            
                                                            if (isEmpty.value !== "") {
                                                                editModaTitle(updateTitle, modalIndex);
                                                                setUpdateTitle('');
                                                                setIsEditModalTitle(false);
                                                                setUpdateModalCompareIndex('');
                                                            }
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                </div>
                                            </div>
                                        :
                                            <ContentWithPictureAccordion
                                                contentIndex={contentIndex}
                                                currentColumnContentIndex={currentColumnContentIndex}
                                                currentColumn={currentColumn}
                                                modalItem={modalItem}
                                                modalIndex={modalIndex}
                                                setShowEditor={props.setShowEditor}
                                                setColumn={props.setColumn}
                                                setIsEditModalTitle={setIsEditModalTitle}
                                                setUpdateTitle={setUpdateTitle}
                                                setUpdateModalCompareIndex={setUpdateModalCompareIndex}
                                            />
                                        }
                                    </li>
                                ))}
                                {currentColumn.content[currentColumnContentIndex][contentIndex].output.modal.length < 4 &&
                                    <li className="content-picture-modal-list-item mb-2">
                                        <div className="content-picture-modal-input-wrapper">
                                            <div className="content-picture-modal-input-label">
                                                <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.modal.length+1}.</span>
                                            </div>
                                            <div className="content-picture-modal-input">
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    placeholder="Type title here. . ."
                                                    onChange={(event) => setModalTitle(event.target.value)}
                                                    value={modalTitle}
                                                />
                                            </div>
                                            <div className="content-picture-modal-button">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => {
                                                        const isEmpty = document.getElementById("title");
                                                        
                                                        if (isEmpty.value !== "") {
                                                            setModalTitle('');
                                                            addContentModal(modalTitle);
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                }
                            </>
                        :
                            <li className="content-picture-modal-list-item mb-2">
                                <div className="content-picture-modal-input-wrapper">
                                    <div className="content-picture-modal-input-label">
                                        <span>1.</span>
                                    </div>
                                    <div className="content-picture-modal-input">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Type title here. . ."
                                            onChange={(event) => setModalTitle(event.target.value)}
                                            value={modalTitle}
                                        />
                                    </div>
                                    <div className="content-picture-modal-button">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                const isEmpty = document.getElementById("title");
                                                
                                                if (isEmpty.value !== "") {
                                                    setModalTitle('');
                                                    addContentModal(modalTitle);
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </div>
                                </div>
                            </li>             
                        }
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Background Music</label>
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
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Title Border Position</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.titleBoxBorder}
                                    onChange={(event) => setTitleBorder(event, contentIndex)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="border-left">Border-left</option>
                                    <option value="border-top">Border-bottom</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label homepage-color-scheme-label">
                                <span>Title Border Color</span>
                            </div>
                            <div className="sg-control-input-list-input homepage-color-scheme-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showBorderColorPicker ? setShowBorderColorPicker(false) : setShowBorderColorPicker(true)} style={{ background: titleBoxColor, cursor: 'pointer' }}>
                                    {titleBoxColor === 'transparent' ?
                                        <span className="h-100 w-100 text-black text-uppercase">{titleBoxColor}</span>
                                    :
                                        <span className="h-100 w-100 text-white">{titleBoxColor}</span>
                                    }
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label homepage-color-scheme-label">
                                <span>Title Text Color</span>
                            </div>
                            <div className="sg-control-input-list-input homepage-color-scheme-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showTextColorPicker ? setShowTextColorPicker(false) : setShowTextColorPicker(true)} style={{ background: titleTextColor, cursor: 'pointer' }}>
                                    {titleBoxColor === 'transparent' ?
                                        <span className="h-100 w-100 text-black text-uppercase">{titleTextColor}</span>
                                    :
                                        <span className="h-100 w-100 text-white">{titleTextColor}</span>
                                    }
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label content-picture-background-color-label">
                                <span>Background Color</span>
                            </div>
                            <div className="sg-control-input-list-input content-picture-background-color-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showPickerBg ? setShowPickerBg(false) : setShowPickerBg(true)} style={{ background: currentBackgroundColor, cursor: 'pointer' }}>
                                    {currentBackgroundColor !== 'transparent' && currentBackgroundColor !== '' ?
                                        <span className="text-white h-100 w-100">{currentBackgroundColor}</span>
                                    :
                                        <span className="text-black h-100 w-100">TRANSPARENT</span>
                                    }
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="content-with-picture-top"
                                placement="top"
                                overlay={
                                    <Tooltip id='content-with-picture-tooltip-top'>
                                        <span>
                                            Choose layout option for image and content:<br/>
                                            Legend: <br/>
                                            50 - 50 = 50% Image and 50% content
                                            75 - 25 = 75% Image and 25% content
                                        </span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Layout</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.layout}
                                    onChange={(event) => setLayout(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="50-50">&nbsp;50|50</option>
                                    <option value="75-25">&nbsp;75|25</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Text Color</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.textColor}
                                    onChange={(event) => setTextColor(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="text-black">&nbsp;Black</option>
                                    <option value="text-white">&nbsp;White</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Image Position</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.imgPosition}
                                    onChange={(event) => setImgPosition(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="left">&nbsp;Left</option>
                                    <option value="right">&nbsp;Right</option>
                                </select>
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
                                            'content' in currentColumn && currentColumn.content[currentColumnContentIndex].length > 0 && 
                                                currentColumnContentIndex in currentColumn.content && currentColumn.content[currentColumnContentIndex].length > 0 &&
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
                                            'content' in currentColumn && currentColumn.content[currentColumnContentIndex].length > 0 &&
                                                currentColumnContentIndex in currentColumn.content && currentColumn.content[currentColumnContentIndex].length > 0 &&
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
            <ColorPickerBg
                classNames="position-absolute content-picture-color-picker-bg"
                showPicker={showPickerBg}
                setBackgroundColor={setBackgroundColor}
                defaultColor={currentBackgroundColor}
            />
            <ColorPickerModalBtn
                classNames="position-absolute content-picture-color-picker-modal-btn"
                showPicker={showPickerModalBtn}
                setBackgroundColor={setModalBtnColor}
                defaultColor={currentModalBtnColor}
            />
            <ColorPicker
                classNames="position-absolute content-picture-border-color-picker"
                showPicker={showBorderColorPicker}
                setBackgroundColor={setTitleBoxColor}
                defaultColor={titleBoxColor}
            />
            <ColorPicker
                classNames="position-absolute content-picture-text-color-picker"
                showPicker={showTextColorPicker}
                setBackgroundColor={setTitleTextColor}
                defaultColor={titleTextColor}
            />
            <AltTagForm
                imgUrlPreview={imgUrlPreview}
                file={file}
                fileIndex={fileIndex}
                handleImageUpload={handleImageUpload}
                modalShow={modalShow}
                setModalShow={setModalShow}
                location="contentPicture"
                setImgAlt={setImgAlt}
            />
        </div>
    );
}

export default ContentWithPicture;
