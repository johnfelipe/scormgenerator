import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function CourseObj(props) {
    
    const [isShownTextArea, setIsShownTextArea] = useState(false);
    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => props.deleteFeature(props.contentIndex)}>
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
                    {/* <div className="sg-expandable-rich-text">
                        <div className="sg-workspace-expander">
                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                { 
                                    isShownTextArea ? 
                                        <button type="button" className="textarea-hover-btn btn btn-light" onMouseLeave={() => setIsShownTextArea(false)} onClick={() => {props.setShowTextEditor(true, props.contentIndex); console.log('text')}}>
                                            <span>Click to Edit</span>
                                        </button>
                                    :
                                        <span></span>
                                }
                                <textarea 
                                    onMouseOver={() => setIsShownTextArea(true)} 
                                    disabled 
                                    value={ 
                                        typeof props.currentColumn != "undefined" ? 
                                            'content' in props.currentColumn && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ? 
                                                props.currentColumnContentIndex in props.currentColumn.content && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ?
                                                    props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].output 
                                                :
                                                    ''
                                            : 
                                                ''
                                        : 
                                            ''
                                    }
                                />
                            </div>
                        </div>
                    </div> */}
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Course Information</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <div className="sg-expandable-code-editor">
                                    <div className="sg-workspace-expander">
                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowTextEditor(true, props.contentIndex, 'courseInfo')}>
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
                                <span>ID</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureId(event, props.contentIndex)}
                                    value={ 
                                        typeof props.currentColumn != "undefined" ? 
                                            'content' in props.currentColumn && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ? 
                                                props.currentColumnContentIndex in props.currentColumn.content && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ?
                                                    props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].id 
                                                :
                                                    ''
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
                                    onChange={(event) => props.setFeatureClass(event, props.contentIndex)}
                                    value={ 
                                        typeof props.currentColumn != "undefined" ? 
                                            'content' in props.currentColumn && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ? 
                                                props.currentColumnContentIndex in props.currentColumn.content && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ?
                                                    props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].class 
                                                :
                                                    ''
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
                                    onChange={(event) => props.setFeatureId(event, props.contentIndex)}
                                    value={ 
                                        typeof props.currentColumn != "undefined" ? 
                                            'content' in props.currentColumn && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ? 
                                                props.currentColumnContentIndex in props.currentColumn.content && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ?
                                                    props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].id 
                                                :
                                                    ''
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
                                    onChange={(event) => props.setFeatureClass(event, props.contentIndex)}
                                    value={ 
                                        typeof props.currentColumn != "undefined" ? 
                                            'content' in props.currentColumn && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ? 
                                                props.currentColumnContentIndex in props.currentColumn.content && props.currentColumn.content[props.currentColumnContentIndex].length > 0 ?
                                                    props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].class 
                                                :
                                                    ''
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
                                <span>Element CSS</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <div className="sg-expandable-code-editor">
                                    <div className="sg-workspace-expander">
                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowCssEditor(true, props.contentIndex)}>
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
