import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Quiz(props) {
    
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
                    <label>Content Setup</label>
                </div>
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Question/s</span>
                            </div>
                            <div className="sg-control-input-list-input sg-control-input-list-input-height-5">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureId(event, props.contentIndex)}
                                    value={ 
                                        typeof props.currentColumn != "undefined" ? 
                                            'content' in props.currentColumn && props.currentColumn.content.length > 0 ? 
                                            props.currentColumn.content[props.contentIndex].id 
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
                <div className="sg-control-input sg-control-input">
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
                                            'content' in props.currentColumn && props.currentColumn.content.length > 0 ? 
                                            props.currentColumn.content[props.contentIndex].id 
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
                                            'content' in props.currentColumn && props.currentColumn.content.length > 0 ? 
                                            props.currentColumn.content[props.contentIndex].class 
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
        </div>
    )
}

export default Quiz;
