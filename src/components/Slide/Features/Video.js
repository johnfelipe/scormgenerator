import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';

function Video(props) {
    
    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const [isShownTextArea, setIsShownTextArea] = useState(false);

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
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            setVideo(files[0].name, reader.result, files[0].type);
        }
    }

    const handleVttUpload = (e) => {
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            setVtt(files[0].name, reader.result, files[0].type);
        }
    }
    
    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
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
                    <label>Content Setup</label>
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
                    </ul>
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
                                        <button type="button" className="textarea-hover-btn btn btn-light" onMouseLeave={() => setIsShownTextArea(false)} onClick={() => props.setShowEditor(true, contentIndex, 'video')}>
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
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph
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
