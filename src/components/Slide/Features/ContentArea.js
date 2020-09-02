import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../../services';

// modal
import AltTagForm from '../../AlertModal/AltTagForm';

function ContentArea(props) {

    const { contentIndex, currentColumnContentIndex, currentColumn } = props;
    const [isShownTextArea, setIsShownTextArea] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [imgUrlPreview, setImgUrlPreview] = useState('');
    const [file, setFile] = useState('');
    const [fileIndex, setFileIndex] = useState('');

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
            formData.append('uid', 1);
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

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
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
                <div className="sg-control-header">
                    <label>Content Setup</label>
                </div>
                <div className="sg-control-input">
                    <div className="sg-expandable-rich-text">
                        <div className="sg-workspace-expander">
                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                { 
                                    isShownTextArea ? 
                                        <button
                                            type="button"
                                            className="textarea-hover-btn btn btn-light"
                                            onMouseLeave={() => setIsShownTextArea(false)}
                                            onClick={() => props.setShowEditor(true, contentIndex, 'contentArea')}
                                        >
                                            <span>Click to Edit</span>
                                        </button>
                                    :
                                        <span></span>
                                }
                                <textarea 
                                    onMouseOver={() => setIsShownTextArea(true)} 
                                    disabled 
                                    value={ 
                                        typeof currentColumn != "undefined" &&
                                        'content' in currentColumn &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumnContentIndex in currentColumn.content &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output
                                    }
                                />
                            </div>
                        </div>
                    </div>
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
