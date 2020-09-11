import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../../services';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RadioGroup, Radio } from 'react-radio-group';
import ReactHtmlParser from 'react-html-parser';

function Video(props) {
    
    const { contentIndex, currentColumnContentIndex, currentColumn, uid } = props;

    const setVideo = (name, url, type) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.name = name;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.type = type;

        props.setColumn(currentColumnObj);
    }

    const setVtt = (name, url, type) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.vtt.name = name;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.vtt.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.vtt.type = type;

        props.setColumn(currentColumnObj);
    }

    const handleVideoChange = (e) => {
        let files = e.target.files;
        const formData = new FormData();
        // let reader = new FileReader();

        // reader.readAsDataURL(files[0])
        // reader.onloadend = () => {
        //     setVideo(files[0].name, reader.result, files[0].type);
        // }

        formData.append('file', files[0]);
        formData.append('uid', uid);
        formData.append('alt', files[0].name);

        galleryService.uploadFiles(formData)
        .then(
            fileObject => {
                console.log(fileObject);
                setVideo(fileObject.name, fileObject.image, fileObject.type);
            },
            error => console.log(error)
        );
    }

    const handleVttUpload = (e) => {
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            setVtt(files[0].name, reader.result, files[0].type);
        }
    }

    const setShowPlayer = (value) => {
        const currentColumnObj = currentColumn;
        
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.show = value;

        props.setColumn(currentColumnObj);
    }
    
    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions border-top border-gray">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'courseObjectives')}>
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
                    <label>Video Setup</label>
                </div>
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label">
                                <span>Video</span>
                            </div>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleVideoChange} accept="video/*"/>
                                    </span>
                                </label>
                                <input type="text" placeholder="Upload video" className="form-control w-50" value={currentColumn.content[currentColumnContentIndex][contentIndex].output.name && currentColumn.content[currentColumnContentIndex][contentIndex].output.name} readOnly/>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label">
                                <span>Vtt file</span>
                            </div>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleVttUpload}/>
                                    </span>
                                </label>
                                <input type="text" placeholder="Upload subtitle" className="form-control w-50" value={currentColumn.content[currentColumnContentIndex][contentIndex].output.vtt.name && currentColumn.content[currentColumnContentIndex][contentIndex].output.vtt.name} readOnly/>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Choose whether to show player or not.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Show player</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <RadioGroup
                                    name="fruit"
                                    selectedValue={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.show &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.show
                                    }
                                    onChange={setShowPlayer}
                                    className="row m-0"
                                >
                                    <label className="mb-1 mt-1 p-0 col-md-6">
                                        <Radio
                                            value="yes"
                                            className="mr-2" 
                                            disabled={
                                                currentColumn.content[currentColumnContentIndex][contentIndex].output.name === '' ?
                                                    true
                                                :
                                                    false
                                            }
                                        />
                                        <span>Yes</span>
                                    </label>
                                    <label className="mb-1 mt-1 p-0 col-md-6">
                                        <Radio
                                            value="no"
                                            className="mr-2"
                                            disabled={
                                                currentColumn.content[currentColumnContentIndex][contentIndex].output.name === '' ?
                                                    true
                                                :
                                                    false
                                            }
                                        />
                                        <span>No</span>
                                    </label>
                                </RadioGroup>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-text-editor">
                <div className="sg-control-header d-flex justify-content-between">
                    <label>Body Text</label>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => props.setShowEditor(true, contentIndex, 'video')}>
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
                                        // currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph !== '' ?
                                            typeof ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph)[0].props.children[0] !== 'object' ?
                                                ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph)[0].props.children[0]
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
                    <label>Customize</label>
                </div>
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
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
        </div>
    );
}

export default Video;
