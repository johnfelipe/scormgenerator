import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function HtmlEditor(props) {

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const contentFor = props.contentFor;
    const activeListModalOutputIndex = props.activeListModalOutputIndex;

    const onChangeTextEditor = (value, contentIndex, editorType) => {
        const currentColumnObj = currentColumn;

        if (editorType.type === 'text') {
            if (editorType.for === 'courseInfo') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = value;
            } else if (editorType.for === 'courseReq') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = value;
            } else if (editorType.for === 'listModal') {
                currentColumn.content[currentColumnContentIndex][contentIndex].output[activeListModalOutputIndex].content = value;
            }
        }

        props.setColumn(currentColumnObj);
    }

    return (
        <div className={props.showHtmlEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor"}>
            <div className="sg-workspace-expander-head">
                <div className="sg-workspace-expander-head-label">
                    <span>HTML</span>
                </div>
                <div className="sg-workspace-expander-head-actions">
                    <button type="button" className="sg-close" onClick={() => props.setShowEditor(false, contentIndex)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
            </div>
            <div className="sg-workspace-expander-body">
                <div className="sg-text-editor sg-text-editor-mode-html h-100">
                    {
                        contentFor === '' ?
                            <textarea
                                className="sg-text-editor-html"
                                value={ 
                                    typeof currentColumn !== "undefined" ? 
                                        'content' in currentColumn && currentColumn.content[currentColumnContentIndex].length > 0 ? 
                                            currentColumnContentIndex in currentColumn.content && currentColumn.content[currentColumnContentIndex].length > 0  ?
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
                        :
                            <textarea
                                className="sg-text-editor-html"
                                value={
                                    contentFor === 'courseInfo' ?
                                        typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output.courseInfo.content
                                    :
                                        contentFor === 'courseReq' ?
                                            typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output.courseReq.content
                                        :
                                            contentFor === 'listModal' &&
                                                typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output[activeListModalOutputIndex].content
                                }
                                onChange={(event) => onChangeTextEditor(event.target.value, contentIndex, { type: 'text', for: contentFor })}
                            />
                    }
                </div>
            </div>
        </div>
    );
}

export default HtmlEditor;
