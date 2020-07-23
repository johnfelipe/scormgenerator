import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';

function Audio(props) {

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(props.contentIndex, 'audio')}>
                        <FontAwesomeIcon icon={faUndo}/>
                        <span>Reset</span>
                    </button>
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
                        <li className="sg-control-input-list-item-textarea">
                            <div className="sg-control-input-list-label">
                                {/* <span>Choose Audio</span> */}
                                <span>Embed Code</span>
                            </div>
                            <div className="sg-control-input-list-input sg-control-input-list-input-height-5">
                                <textarea
                                    placeholder="Put embed code here . . ."
                                    className="sg-input-code"
                                    style={{fontSize: 10}}
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
                                    onChange={(event) => props.onChangeTextArea(event, props.contentIndex, 'html')}
                                />
                                {/* <ul className="audio-feature-value-list pl-0">
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
                                </ul> */}
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

export default Audio;
