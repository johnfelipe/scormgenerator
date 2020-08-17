import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

// components
import ListUlAccordion from './ListUlAccordion';

function List(props) {

    const { contentIndex, currentColumn, currentColumnContentIndex } = props;
    const [entry, setEntry] = useState('');
    const [updateEntry, setUpdateEntry] = useState('');
    const [updateEntryCompareIndex, setUpdateEntryCompareIndex] = useState('');
    const [isEditEntry, setIsEditEntry] = useState(false);

    const addEntry = (value) => {
        const currentColumnObj = currentColumn;

        const entry = {
            entry: value,
            subEntry: [],
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(entry);

        props.setColumn(currentColumnObj);
    }

    const editEntry = (value, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].question = value;

        props.setColumn(currentColumnObj);
    }

    const deleteEntry = (questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.splice(questionIndex, 1);

        props.setColumn(currentColumnObj);
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'contentArea')}>
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
                        <li className="sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Question/s</span>
                            </div>
                            <div className="sg-control-input-list-input">
                            <ul style={{ listStyle: 'none' }} className="list-group list-ul-list">
                                    {
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 ? 
                                                <>
                                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                        <li key={'number-' + index} className="list-ul-list-item mb-2">
                                                            {
                                                                isEditEntry && updateEntryCompareIndex === index ?
                                                                    <div className="list-ul-control-input-wrapper">
                                                                        <div className="list-ul-control-input-label">
                                                                            <span>{index+1}.</span>
                                                                        </div>
                                                                        <div className="list-ul-control-input">
                                                                            <input
                                                                                id="entry"
                                                                                name="entry"
                                                                                type="text"
                                                                                placeholder="Type entry here. . ."
                                                                                onChange={(event) => setUpdateEntry(event.target.value)}
                                                                                value={updateEntry}
                                                                            />
                                                                        </div>
                                                                        <div className="list-ul-control-button">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-sm"
                                                                                onClick={() => {
                                                                                    const isEmpty = document.getElementById("entry");
                                                                                    
                                                                                    if (isEmpty.value !== "") {
                                                                                        editEntry(updateEntry, index);
                                                                                        setUpdateEntry('');
                                                                                        setIsEditEntry(false);
                                                                                        setUpdateEntryCompareIndex('');
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                :
                                                                    <ListUlAccordion
                                                                        index={index}
                                                                        item={item}
                                                                        deleteEntry={deleteEntry}
                                                                        setIsEditEntry={setIsEditEntry}
                                                                        setUpdateEntry={setUpdateEntry}
                                                                        contentIndex={contentIndex}
                                                                        setShowTextEditor={props.setShowTextEditor}
                                                                        setUpdateEntryCompareIndex={setUpdateEntryCompareIndex}
                                                                    />
                                                            }
                                                        </li>
                                                    ))}
                                                    <li className="list-ul-list-item">
                                                        <div className="list-ul-control-input-wrapper">
                                                            <div className="list-ul-control-input-label">
                                                                <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length+1}.</span>
                                                            </div>
                                                            <div className="list-ul-control-input">
                                                                <input
                                                                    id="entry"
                                                                    name="entry"
                                                                    type="text"
                                                                    placeholder="Type entry here. . ."
                                                                    onChange={(event) => setEntry(event.target.value)}
                                                                    value={entry}
                                                                />
                                                            </div>
                                                            <div className="list-ul-control-button">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() => {
                                                                        const isEmpty = document.getElementById("entry");
                                                                        
                                                                        if (isEmpty.value !== "") {
                                                                            addEntry(entry);
                                                                            setEntry('');
                                                                        }
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </>
                                        :
                                            <li className="list-ul-list-item">
                                                <div className="list-ul-control-input-wrapper">
                                                    <div className="list-ul-control-input-label">
                                                        <span>1.</span>
                                                    </div>
                                                    <div className="list-ul-control-input">
                                                        <input
                                                            id="entry"
                                                            name="entry"
                                                            type="text"
                                                            placeholder="Type entry here. . ."
                                                            onChange={(event) => setEntry(event.target.value)}
                                                            value={entry}
                                                        />
                                                    </div>
                                                    <div className="list-ul-control-button">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => {
                                                                const isEmpty = document.getElementById("entry");
                                                                
                                                                if (isEmpty.value !== "") {
                                                                    addEntry(entry);
                                                                    setEntry('');
                                                                }
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                        </button>
                                                    </div>
                                                </div>
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
                                    onChange={(event) => props.setFeatureId(event, contentIndex)}
                                    value={ 
                                        typeof currentColumn != "undefined" &&
                                        'content' in currentColumn &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumnContentIndex in currentColumn.content &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
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
                                        'content' in currentColumn &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumnContentIndex in currentColumn.content &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
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
    )
}

export default List;
