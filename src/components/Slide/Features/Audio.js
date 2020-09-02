import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../../services';

// modal
import AltTagForm from '../../AlertModal/AltTagForm';

function Audio(props) {

    const { contentIndex, currentColumnContentIndex, currentColumn } = props;
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

    const handleAudioUpload = (e) => {
        const currentColumnObj = currentColumn;
        let files = e.target.files;
        const formData = new FormData();

        formData.append('file', files[fileIndex]);
        formData.append('uid', 1);
        formData.append('alt', files[fileIndex].name);

        galleryService.uploadFiles(formData)
        .then(
            fileObject => {
                console.log(fileObject);

                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.audio.name = fileObject.name;
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.audio.url = fileObject.image;
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.audio.type = fileObject.type;

            },
            error => console.log(error)
        );
        
        props.setColumn(currentColumnObj);
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'audio')}>
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
                    {/* <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-textarea">
                            <div className="sg-control-input-list-label">
                                <span>Choose Audio</span>
                                <span>Embed Code</span>
                            </div>
                            <div className="sg-control-input-list-input sg-control-input-list-input-height-5">
                                <textarea
                                    placeholder="Put embed code here . . ."
                                    className="sg-input-code"
                                    style={{fontSize: 10}}
                                    value={ 
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output
                                    }
                                    onChange={(event) => props.onChangeTextArea(event.target.value, contentIndex, 'html')}
                                />
                                <ul className="audio-feature-value-list pl-0">
                                    {
                                        props.mediaFilesObject.length > 0 ?
                                            props.mediaFilesObject.map((mediaFile, mediaIndex)=> (
                                                mediaFile.type.includes("audio") ?
                                                    <li key={mediaIndex} className="audio-feature-value-list-item">
                                                        <input type="radio" value={mediaIndex} onClick={() => this.radioClick(mediaIndex, mediaFile)} checked={this.state.radioValue === mediaIndex ? true : false} />
                                                        <label className="pl-1">{mediaFile.name}</label>
                                                    </li>
                                                :
                                                    null
                                            ))
                                        :
                                            <div className="w-100">
                                                <input
                                                    type="file"
                                                    onChange={this.handleFileUpload}
                                                    accept="audio/*"
                                                    multiple
                                                />
                                            </div>
                                    }
                                </ul>
                            </div>
                        </li> */}

                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label">
                                <span>Audio</span>
                            </div>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn mb-0">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleAudioUpload} accept="image/*"/>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Upload Audio"
                                    className="form-control w-50"
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.audio.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.audio.name
                                    }
                                    readOnly
                                />
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
                                        typeof currentColumn != "undefined" ? 
                                            'content' in currentColumn && currentColumn.content.length > 0 ? 
                                            currentColumn.content[contentIndex].id 
                                            : 
                                            ''
                                        : 
                                        '' 
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
                                        typeof currentColumn != "undefined" ? 
                                            'content' in currentColumn && currentColumn.content.length > 0 ? 
                                            currentColumn.content[contentIndex].class 
                                            : 
                                            ''
                                        : 
                                        '' 
                                    }
                                />
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

export default Audio;
