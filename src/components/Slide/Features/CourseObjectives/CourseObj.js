import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faCheckCircle, faEdit, faTimes, faCaretUp, faCaretDown, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Card, Button } from 'react-bootstrap';
import { galleryService } from '../../../../services';

// components
import ColorPicker from '../../../Common/ColorPicker';

function CourseObj(props) {
    
    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const courseNav = currentColumn.content[currentColumnContentIndex][contentIndex].output.courseNav;
    const courseInfo = currentColumn.content[currentColumnContentIndex][contentIndex].output.courseInfo;
    const courseReq = currentColumn.content[currentColumnContentIndex][contentIndex].output.courseReq;
    const currentBackgroundColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.courseIntroColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.courseIntroColor;
    const [editCourseNavName, setEditCourseNavName] = useState(false);
    const [courseNavName, setCourseNavName] = useState('');
    const [editCourseInfoName, setEditCourseInfoName] = useState(false);
    const [courseInfoName, setCourseInfoName] = useState('');
    const [editCourseReqName, setEditCourseReqName] = useState(false);
    const [courseReqName, setCourseReqName] = useState('');
    const [cNavCollapseId, setCNavCollapseId] = useState(false);
    const [cInfoCollapseId, setCInfoCollapseId] = useState(false);
    const [cReqCollapseId, setCReqCollapseId] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const updateCourseNavName = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseNav.name = value;

        props.setColumn(currentColumnObj);
    }

    const updateCourseInfoName = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.name = value;

        props.setColumn(currentColumnObj);
    }

    const updateCourseReqName = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.name = value;

        props.setColumn(currentColumnObj);
    }

    const collapseListener = (currentCollapseId, type) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        if (type === 'cInfo') {
            setCInfoCollapseId(currentCollapseId);
        } else if (type === 'cReq') {
            setCReqCollapseId(currentCollapseId);
        } else if (type === 'cNav') {
            setCNavCollapseId(currentCollapseId);
        }
    }

    const setIntroVideo = (name, url, type) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].introVideo.name = name;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].introVideo.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].introVideo.type = type;

        props.setColumn(currentColumnObj);
    }

    const handleVideoChange = (e) => {
        let files = e.target.files;
        // let reader = new FileReader();
        const formData = new FormData();

        // reader.readAsDataURL(files[0])
        // reader.onloadend = () => {
        //     setIntroVideo(files[0].name, reader.result, files[0].type);
        // }

        formData.append('file', files[0]);
        formData.append('uid', 1);
        formData.append('alt', files[0].name);

        galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    console.log(fileObject);
                    setIntroVideo(fileObject.name, fileObject.image, fileObject.type);
                    props.setMediaFiles(fileObject);
                },
                error => console.log(error)
            );
    }

    const setIntroVideoPosition = (value) => {
        const currentColumnObj = currentColumn;
        
        currentColumnObj.content[currentColumnContentIndex][contentIndex].introVideo.position = value;

        props.setColumn(currentColumnObj);
    }

    const setCourseIntroColor = (value) => {
        const currentColumnObj = currentColumn;
        
        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.courseIntroColor = value;

        props.setColumn(currentColumnObj);
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
                                <input type="text" placeholder="Upload video" className="form-control w-50" value={currentColumn.content[currentColumnContentIndex][contentIndex].introVideo.name && currentColumn.content[currentColumnContentIndex][contentIndex].introVideo.name} readOnly/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Buttons</label>
                </div>
                <div className="sg-control-input">
                <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <Accordion className="w-100">
                                <Card>
                                    <Card.Header>
                                        {editCourseNavName ?
                                            <div className="row m-0">
                                                <div className="col-md-8 p-0">
                                                    <input
                                                        name="courseInfoName"
                                                        className="form-control"
                                                        value={courseNavName}
                                                        onChange={(e) => setCourseNavName(e.target.value)}
                                                    />
                                                </div>
                                                <div id="edit-action-btn-grp" className="col-md-4 pr-0">
                                                    <button type="button" className="btn btn-success btn-sm mt-1"  onClick={() => {setEditCourseNavName(false); updateCourseNavName(courseNavName)}}>
                                                        <FontAwesomeIcon icon={faCheckCircle}/>
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-sm ml-2 mt-1"  onClick={() => {setEditCourseNavName(false); setCourseInfoName('')}}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                </div>
                                            </div>
                                        :
                                            <div className="row m-0">
                                                <div className="col-md-9 pl-0">
                                                    <Accordion.Toggle as={Button} variant="link" className="p-0" eventKey="0" onClick={() => collapseListener(cNavCollapseId, 'cNav')}>
                                                        {courseNav.name}
                                                    </Accordion.Toggle>
                                                </div>
                                                <div id="action-buttons-group" className="col-md-3 p-0">
                                                    <span className="float-right mr-2">
                                                        <FontAwesomeIcon icon={cNavCollapseId === true ? faCaretUp : faCaretDown}/>
                                                    </span>
                                                    <button type="button" className="btn btn-success btn-sm" onClick={() => {setEditCourseNavName(true); setCourseNavName(courseNav.name);}}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <ul className="sg-control-input-list">
                                                <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                    <div className="sg-control-input-list-label">
                                                        <span>Content</span>
                                                    </div>
                                                    <div className="sg-control-input-list-input">
                                                        <div className="sg-expandable-code-editor">
                                                            <div className="sg-workspace-expander">
                                                                <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                    {/* <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, contentIndex, 'courseInfo')} disabled>
                                                                        <span>Edit</span>
                                                                    </button> */}
                                                                    <button
                                                                        type="button"
                                                                        className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                        onClick={() => {
                                                                            props.setShowEditor(true, contentIndex, 'courseNav');
                                                                        }}
                                                                        disabled
                                                                    >
                                                                        <span>Edit</span>
                                                                    </button>
                                                                    <input type="text" value="" disabled className="rounded"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        {editCourseInfoName ?
                                            <div className="row m-0">
                                                <div className="col-md-8 p-0">
                                                    <input
                                                        name="courseInfoName"
                                                        className="form-control"
                                                        value={courseInfoName}
                                                        onChange={(e) => setCourseInfoName(e.target.value)}
                                                    />
                                                </div>
                                                <div id="edit-action-btn-grp" className="col-md-4 pr-0">
                                                    <button type="button" className="btn btn-success btn-sm mt-1"  onClick={() => {setEditCourseInfoName(false); updateCourseInfoName(courseInfoName)}}>
                                                        <FontAwesomeIcon icon={faCheckCircle}/>
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-sm ml-2 mt-1"  onClick={() => {setEditCourseInfoName(false); setCourseInfoName('')}}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                </div>
                                            </div>
                                        :
                                            <div className="row m-0">
                                                <div className="col-md-9 pl-0">
                                                    <Accordion.Toggle as={Button} variant="link" className="p-0" eventKey="1" onClick={() => collapseListener(cInfoCollapseId, 'cInfo')}>
                                                        {courseInfo.name}
                                                    </Accordion.Toggle>
                                                </div>
                                                <div id="action-buttons-group" className="col-md-3 p-0">
                                                    <span className="float-right mr-2">
                                                        <FontAwesomeIcon icon={cInfoCollapseId === true ? faCaretUp : faCaretDown}/>
                                                    </span>
                                                    <button type="button" className="btn btn-success btn-sm" onClick={() => {setEditCourseInfoName(true); setCourseInfoName(courseInfo.name);}}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <ul className="sg-control-input-list">
                                                <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                    <div className="sg-control-input-list-label">
                                                        <span>Content</span>
                                                    </div>
                                                    <div className="sg-control-input-list-input">
                                                        <div className="sg-expandable-code-editor">
                                                            <div className="sg-workspace-expander">
                                                                <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                    {/* <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, contentIndex, 'courseInfo')}>
                                                                        <span>Edit</span>
                                                                    </button> */}
                                                                    <button
                                                                        type="button"
                                                                        className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                        onClick={() => {
                                                                            props.setShowEditor(true, contentIndex, 'courseInfo');
                                                                        }}
                                                                    >
                                                                        <span>Edit</span>
                                                                    </button>
                                                                    <input type="text" value="" disabled className="rounded"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    {editCourseReqName ?
                                            <div className="row m-0">
                                                <div className="col-md-8 p-0">
                                                    <input
                                                        name="courseReqName"
                                                        className="form-control"
                                                        value={courseReqName}
                                                        onChange={(e) => setCourseReqName(e.target.value)}
                                                    />
                                                </div>
                                                <div id="edit-action-btn-grp" className="col-md-4 pr-0">
                                                    <button type="button" className="btn btn-success btn-sm mt-1"  onClick={() => {setEditCourseReqName(false); updateCourseReqName(courseReqName)}}>
                                                        <FontAwesomeIcon icon={faCheckCircle}/>
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-sm ml-2 mt-1"  onClick={() => {setEditCourseReqName(false); setCourseReqName('')}}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                </div>
                                            </div>
                                        :
                                            <div className="row m-0">
                                                <div className="col-md-9 pl-0">
                                                    <Accordion.Toggle as={Button} variant="link" className="p-0" eventKey="2" onClick={() => collapseListener(cReqCollapseId, 'cReq')}>
                                                        {courseReq.name}
                                                    </Accordion.Toggle>
                                                </div>
                                                <div id="action-buttons-group" className="col-md-3 p-0">
                                                    <span className="float-right mr-2">
                                                        <FontAwesomeIcon icon={cReqCollapseId === true ? faCaretUp : faCaretDown}/>
                                                    </span>
                                                    <button type="button" className="btn btn-success btn-sm" onClick={() => {setEditCourseReqName(true); setCourseReqName(courseInfo.name);}}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                            <ul className="sg-control-input-list">
                                                <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                    <div className="sg-control-input-list-label">
                                                        <span>Content</span>
                                                    </div>
                                                    <div className="sg-control-input-list-input">
                                                        <div className="sg-expandable-code-editor">
                                                            <div className="sg-workspace-expander">
                                                                <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                    {/* <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, contentIndex, 'courseReq')}>
                                                                        <span>Edit</span>
                                                                    </button> */}
                                                                    <button
                                                                        type="button"
                                                                        className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                        onClick={() => {
                                                                            props.setShowEditor(true, contentIndex, 'courseReq');
                                                                        }}
                                                                    >
                                                                        <span>Edit</span>
                                                                    </button>
                                                                    <input type="text" value="" disabled className="rounded"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
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
                                    <span>Video Position</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <select
                                        value={currentColumn.content[currentColumnContentIndex][contentIndex].introVideo.position}
                                        onChange={(event) => setIntroVideoPosition(event.target.value)}
                                        className="form-control-plaintext border border-secondary rounded"
                                    >
                                        <option value="course-objectives-video-left">&nbsp;Left</option>
                                        <option value="course-objectives-video-right">&nbsp;Right</option>
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
                            <div className="sg-control-input-list-label multiple-choice-background-color-label">
                                <span>Background Color</span>
                            </div>
                            <div className="sg-control-input-list-input multiple-choice-background-color-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showPicker ? setShowPicker(false) : setShowPicker(true)} style={{ background: currentBackgroundColor, cursor: 'pointer' }}>
                                    <span className="text-white h-100 w-100">{currentBackgroundColor}</span>
                                </div>
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
            <ColorPicker
                classNames="position-absolute course-objectives-color-picker"
                showPicker={showPicker}
                setBackgroundColor={setCourseIntroColor}
                defaultColor={currentBackgroundColor}
            />
        </div>
    );
}

export default CourseObj;
