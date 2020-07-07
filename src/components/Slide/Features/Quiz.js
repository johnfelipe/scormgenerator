import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

function Quiz(props) {

    const [question, setQuestion] = useState('');
    
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
                                <ul style={{ listStyle: 'none' }} className="list-group quiz-question-list">
                                    {
                                        props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].output.length > 0 ? 
                                                <>
                                                    {props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].output.map((question, index) => (
                                                        <li key={'number-' + index} className="quiz-question-list-item">
                                                            <span>{index+1 + '. '}</span>
                                                            <span className="ml-2">{question}</span>
                                                        </li>
                                                    ))}
                                                    <li className="quiz-question-list-item">
                                                        <span>{props.currentColumn.content[props.currentColumnContentIndex][props.contentIndex].output.length+1}.</span>
                                                        <input
                                                            className="ml-2 mt-1"
                                                            type="text"
                                                            placeholder="Type question here. . ."
                                                            onChange={(event) => setQuestion(event.target.value)}
                                                            value={question}
                                                        />
                                                        <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => {props.addQuestion(question, props.contentIndex); setQuestion('');}}>
                                                            <FontAwesomeIcon icon={faCheck}/>
                                                        </button>
                                                    </li>
                                                </>
                                        :
                                            <li className="quiz-question-list-item">
                                                <span>1.</span>
                                                <input
                                                    className="ml-2"
                                                    type="text"
                                                    placeholder="Type question here. . ."
                                                    onChange={(event) => setQuestion(event.target.value)}
                                                    value={question}
                                                />
                                                <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => {props.addQuestion(question, props.contentIndex); setQuestion('');}}>
                                                    <FontAwesomeIcon icon={faCheck}/>
                                                </button>
                                            </li>             
                                    }
                                </ul>
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
