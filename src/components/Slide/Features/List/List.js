import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';

function List(props) {

    const { contentIndex, currentColumn, currentColumnContentIndex,  } = props;

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'list')}>
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
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-textarea">
                            <div className="sg-control-input-list-label">
                                <span>Embed Code</span>
                            </div>
                            <div className="sg-control-input-list-input sg-control-input-list-input-height-5">
                                <textarea
                                    placeholder="Put embed code here . . ."
                                    className="sg-input-code"
                                    style={{fontSize: 10}}
                                    value={ 
                                        typeof currentColumn != "undefined" ? 
                                            'content' in currentColumn && currentColumn.content[currentColumnContentIndex].length > 0 ? 
                                                currentColumnContentIndex in currentColumn.content && currentColumn.content[currentColumnContentIndex].length > 0 ?
                                                    currentColumn.content[currentColumnContentIndex][contentIndex].output 
                                                :
                                                    ''
                                            : 
                                                ''
                                        : 
                                            ''
                                    }
                                    onChange={(event) => props.onChangeTextArea(event, contentIndex, 'html')}
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
                                    onChange={(event) => props.setFeatureId(event, contentIndex)}
                                    value={ 
                                        // typeof currentColumn != "undefined" &&
                                        // 'content' in currentColumn &&
                                        // currentColumn.content.length > 0 &&
                                        // currentColumn.content[contentIndex].id
                                        currentColumn.content[contentIndex] && currentColumn.content[contentIndex].id
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
                                        // typeof currentColumn != "undefined" &&
                                        // 'content' in currentColumn &&
                                        // currentColumn.content.length > 0 &&
                                        // currentColumn.content[contentIndex].class
                                        currentColumn.content[contentIndex] && currentColumn.content[contentIndex].class
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

export default List;
