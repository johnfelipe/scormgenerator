import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowAltCircleRight, faUndo } from '@fortawesome/free-solid-svg-icons';

// components
import SgSubAccordion from './SgSubAccordion';
import ColorPickerBg from '../../../Common/ColorPicker';

function SgAccordion(props) {

    const { currentColumn, contentIndex, currentColumnContentIndex } = props;
    const [sgAccordion, setSgAccordion] = useState('');
    const [sgAccordionContent, setSgAccordionContent] = useState('');
    const [updateSgAccordion, setUpdateSgAccordion] = useState('');
    const [updateSgAccordionCompareIndex, setUpdateSgAccordionCompareIndex] = useState('');
    const [isEditSgAccordion, setIsEditSgAccordion] = useState(false);
    const [isAddSgAccordionContent, setIsAddSgAccordionContent] = useState(false);
    const [showPickerBg, setShowPickerBg] = useState(false);
    const currentBackgroundColor = currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundColor && currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundColor;

    const addSgAccordion = (value) => {
        const currentColumnObj = currentColumn;

        const sgAccordion = {
            title: value,
            content: '',
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(sgAccordion);

        props.setColumn(currentColumnObj);
    }

    const editSgAccordion = (value, sgAccordionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[sgAccordionIndex].title = value;

        props.setColumn(currentColumnObj);
    }

    const deleteSgAccordion = (sgAccordionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.splice(sgAccordionIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const addSgAccordionContent = (value, sgAccordionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[sgAccordionIndex].content = value;

        props.setColumn(currentColumnObj);
    }

    const editSgAccordionContent = (value, sgAccordionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[sgAccordionIndex].content = value;

        props.setColumn(currentColumnObj);
    }

    const setSgAccordionBackgroundColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundColor = color;

        props.setColumn(currentColumnObj);
    }

    const setSgAccordionTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.textColor = color;

        props.setColumn(currentColumnObj);
    }
    
    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'dragDrop')}>
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
                <div className="sg-control-content">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Question/s</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <ul style={{ listStyle: 'none' }} className="list-group sg-accordion-list">
                                    {
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 ? 
                                                <>
                                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                        <li key={'number-' + index} className="sg-accordion-list-item mb-2">
                                                            {
                                                                isEditSgAccordion && updateSgAccordionCompareIndex === index ?
                                                                    <div className="sg-accordion-control-input-wrapper">
                                                                        <div className="sg-accordion-control-input-label">
                                                                            <span>{index+1}.</span>
                                                                        </div>
                                                                        <div className="sg-accordion-control-input">
                                                                            <input
                                                                                id="sgAccordion"
                                                                                name="sgAccordion"
                                                                                type="text"
                                                                                placeholder="Type title here. . ."
                                                                                onChange={(event) => setUpdateSgAccordion(event.target.value)}
                                                                                value={updateSgAccordion}
                                                                            />
                                                                        </div>
                                                                        <div className="sg-accordion-control-button">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-sm"
                                                                                onClick={() => {
                                                                                    const isEmpty = document.getElementById("sgAccordion");
                                                                                    
                                                                                    if (isEmpty.value !== "") {
                                                                                        editSgAccordion(updateSgAccordion, index);
                                                                                        setUpdateSgAccordion('');
                                                                                        setIsEditSgAccordion(false);
                                                                                        setUpdateSgAccordionCompareIndex('');
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                :
                                                                    <SgSubAccordion
                                                                        index={index}
                                                                        item={item}
                                                                        deleteSgAccordion={deleteSgAccordion}
                                                                        setIsEditSgAccordion={setIsEditSgAccordion}
                                                                        setUpdateSgAccordion={setUpdateSgAccordion}
                                                                        setSgAccordionContent={setSgAccordionContent}
                                                                        editSgAccordionContent={editSgAccordionContent}
                                                                        addSgAccordionContent={addSgAccordionContent}
                                                                        setIsAddSgAccordionContent={setIsAddSgAccordionContent}
                                                                        isAddSgAccordionContent={isAddSgAccordionContent}
                                                                        sgAccordionContent={sgAccordionContent}
                                                                        setShowTextEditor={props.setShowTextEditor}
                                                                        setMChoiceIndex={props.setMChoiceIndex}
                                                                        setUpdateSgAccordionCompareIndex={setUpdateSgAccordionCompareIndex}
                                                                    />
                                                            }
                                                        </li>
                                                    ))}
                                                    <li className="sg-accordion-list-item mb-2">
                                                        <div className="sg-accordion-control-input-wrapper">
                                                            <div className="sg-accordion-control-input-label">
                                                                <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length+1}.</span>
                                                            </div>
                                                            <div className="sg-accordion-control-input">
                                                                <input
                                                                    id="sgAccordion"
                                                                    name="sgAccordion"
                                                                    type="text"
                                                                    placeholder="Type title here. . ."
                                                                    onChange={(event) => setSgAccordion(event.target.value)}
                                                                    value={sgAccordion}
                                                                />
                                                            </div>
                                                            <div className="sg-accordion-control-button">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() => {
                                                                        const isEmpty = document.getElementById("sgAccordion");
                                                                        
                                                                        if (isEmpty.value !== "") {
                                                                            addSgAccordion(sgAccordion);
                                                                            setSgAccordion('');
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
                                            <li className="sg-accordion-list-item mb-2">
                                                <div className="sg-accordion-control-input-wrapper">
                                                    <div className="sg-accordion-control-input-label">
                                                        <span>1.</span>
                                                    </div>
                                                    <div className="sg-accordion-control-input">
                                                        <input
                                                            id="sgAccordion"
                                                            name="sgAccordion"
                                                            type="text"
                                                            placeholder="Type title here. . ."
                                                            onChange={(event) => setSgAccordion(event.target.value)}
                                                            value={sgAccordion}
                                                        />
                                                    </div>
                                                    <div className="sg-accordion-control-button">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => {
                                                                const isEmpty = document.getElementById("sgAccordion");
                                                                
                                                                if (isEmpty.value !== "") {
                                                                    addSgAccordion(sgAccordion);
                                                                    setSgAccordion('');
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
                <div className="sg-control-input sg-control-input mt-3">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Text Color</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.dragDropTextColor}
                                    onChange={(event) => setSgAccordionTextColor(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="text-black">&nbsp;Black</option>
                                    <option value="text-white">&nbsp;White</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label sg-accordion-background-color-label">
                                <span>Background Color</span>
                            </div>
                            <div className="sg-control-input-list-input sg-accordion-background-color-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showPickerBg ? setShowPickerBg(false) : setShowPickerBg(true)} style={{ background: currentBackgroundColor, cursor: 'pointer' }}>
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
            <ColorPickerBg
                classNames="position-absolute sg-accordion-color-picker-bg"
                showPicker={showPickerBg}
                setBackgroundColor={setSgAccordionBackgroundColor}
                defaultColor={currentBackgroundColor}
            />
        </div>
    )
}

export default SgAccordion