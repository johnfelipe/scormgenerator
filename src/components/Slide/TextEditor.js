import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function TextEditor(props) {

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const contentFor = props.contentFor;
    const mChoiceIndex = props.mChoiceIndex;

    const onChangeTextEditor = (value, contentIndex, editorType) => {
        const currentColumnObj = currentColumn;

        if (editorType.type === 'text') {
            if (editorType.for === 'courseInfo') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = value;
            } else if (editorType.for === 'courseReq') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = value;
            } else if (editorType.for === 'mChoiceExplanation') {
                currentColumn.content[currentColumnContentIndex][contentIndex].output[mChoiceIndex].explanation.content = value;
            } else if (editorType.for === 'card') {
                currentColumn.content[currentColumnContentIndex][contentIndex].output.content = value;
            }
        }

        props.setColumn(currentColumnObj);
    }

    return (
        <div className={props.showTextEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor"}>
            <div className="sg-workspace-expander-head">
                <div className="sg-workspace-expander-head-label">
                    <span>Text</span>
                </div>
                <div className="sg-workspace-expander-head-actions">
                    <button type="button" className="sg-close" onClick={() => props.setShowTextEditor(false, contentIndex)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
            </div>
            <div className="sg-workspace-expander-body">
                <div className="sg-text-editor sg-text-editor-mode-html h-100">
                    <textarea
                        className="sg-text-editor-html"
                        value={
                            contentFor === 'courseInfo' ?
                                typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output.courseInfo.content
                            :
                                contentFor === 'courseReq' ? 
                                    typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output.courseReq.content
                                :
                                    contentFor === 'card' ? 
                                        typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output.content
                                    :
                                        typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output[mChoiceIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output[mChoiceIndex].explanation && currentColumn.content[currentColumnContentIndex][contentIndex].output[mChoiceIndex].explanation.content
                        }
                        onChange={(event) => onChangeTextEditor(event.target.value, contentIndex, { type: 'text', for: contentFor })}
                    />
                </div>
            </div>
        </div>
    )
}

export default TextEditor;
