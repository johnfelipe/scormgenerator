import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Card, Button } from 'react-bootstrap';

function CourseObj(props) {
    
    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const courseInfo = currentColumn.content[currentColumnContentIndex][contentIndex].output.courseInfo;
    const courseReq = currentColumn.content[currentColumnContentIndex][contentIndex].output.courseReq;
    const [editCourseInfoName, setEditCourseInfoName] = useState(false);
    const [courseInfoName, setCourseInfoName] = useState('');

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
            <div className="sg-control sg-control-text-editor">
                <div className="sg-control-header">
                    <label>Content</label>
                </div>
                <div className="sg-control-input">
                    <Accordion>
                        <Card>
                            <Card.Header>
                                {editCourseInfoName ?
                                    <div>
                                        <input
                                            name="courseInfoName"
                                            className="form-control"
                                            value={courseInfoName}
                                            onChange={(e) => setCourseInfoName(e.target.value)}
                                        />
                                        <button type="button" className="btn btn-success btn-sm"  onClick={() => {setEditCourseInfoName(false);}}>
                                            <FontAwesomeIcon icon={faCheckCircle}/>
                                        </button>
                                    </div>
                                :
                                    <div className="row m-0">
                                        <div className="col-md-10 pl-0">
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                {courseInfo.name}
                                            </Accordion.Toggle>
                                        </div>
                                        <div id="action-buttons-group" className="col-md-2">
                                            <button type="button" className="btn btn-success btn-sm" onClick={() => {setEditCourseInfoName(true); setCourseInfoName(courseInfo.name);}}>
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
                                                <span>Course Info</span>
                                            </div>
                                            <div className="sg-control-input-list-input">
                                                <div className="sg-expandable-code-editor">
                                                    <div className="sg-workspace-expander">
                                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, contentIndex, 'courseInfo')}>
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
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    {courseReq.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <ul className="sg-control-input-list">
                                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                            <div className="sg-control-input-list-label">
                                                <span>Course Req's</span>
                                            </div>
                                            <div className="sg-control-input-list-input">
                                                <div className="sg-expandable-code-editor">
                                                    <div className="sg-workspace-expander">
                                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, contentIndex, 'courseReq')}>
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
                    {/* <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Course Info</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <div className="sg-expandable-code-editor">
                                    <div className="sg-workspace-expander">
                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, contentIndex, 'courseInfo')}>
                                                <span>Edit</span>
                                            </button>
                                            <input type="text" value="" disabled className="rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Course Req's</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <div className="sg-expandable-code-editor">
                                    <div className="sg-workspace-expander">
                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, contentIndex, 'courseReq')}>
                                                <span>Edit</span>
                                            </button>
                                            <input type="text" value="" disabled className="rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul> */}
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

export default CourseObj;
