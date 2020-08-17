import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from 'react-rte';

function HtmlEditor(props) {

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const contentFor = props.contentFor;
    const activeListModalOutputIndex = props.activeListModalOutputIndex;
    
    const [value, setValue] = useState('');
    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(value, 'html'));

    const handleChange = value => {
        setEditorValue(value);
        setValue(value.toString("html"));

        const currentColumnObj = currentColumn;

        if (contentFor === 'courseInfo') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = value.toString("html");
        } else if (contentFor === 'courseReq') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = value.toString("html");
        } else if (contentFor === 'listModal') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeListModalOutputIndex].content = value.toString("html");
        } else if (contentFor === 'video') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.paragraph = value.toString("html");
        } else if (contentFor === 'contentArea') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output = value.toString("html");
        }

        props.setColumn(currentColumnObj);
    };

    // const onChangeTextEditor = (value, contentIndex, editorType) => {
    //     const currentColumnObj = currentColumn;

    //     if (editorType.type === 'text') {
    //         if (editorType.for === 'courseInfo') {
    //             currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = value;
    //         } else if (editorType.for === 'courseReq') {
    //             currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = value;
    //         } else if (editorType.for === 'listModal') {
    //             currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeListModalOutputIndex].content = value;
    //         } else if (editorType.for === 'video') {
    //             currentColumnObj.content[currentColumnContentIndex][contentIndex].output.paragraph = value;
    //         }
    //     }

    //     props.setColumn(currentColumnObj);
    // }

    return (
        <div className={props.showHtmlEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor"}>
            <div className="sg-workspace-expander-head">
                <div className="sg-workspace-expander-head-label">
                    <span>Rich Text Editor</span>
                </div>
                <div className="sg-workspace-expander-head-actions">
                    <button type="button" className="sg-close" onClick={() => props.setShowEditor(false, contentIndex)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
            </div>
            <div className="sg-workspace-expander-body">
                <div className="sg-text-editor sg-text-editor-mode-html h-100">
                    {/* {
                        contentFor === '' ?
                            <textarea
                                className="sg-text-editor-html"
                                value={ 
                                    typeof currentColumn !== "undefined" &&
                                    'content' in currentColumn && currentColumn.content[currentColumnContentIndex].length > 0 &&
                                    currentColumnContentIndex in currentColumn.content && currentColumn.content[currentColumnContentIndex].length > 0  &&
                                    currentColumn.content[currentColumnContentIndex][contentIndex].output
                                }
                                onChange={(event) => props.onChangeTextArea(event.target.value, contentIndex, 'html')}
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
                                            contentFor === 'listModal' ?
                                                typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output[activeListModalOutputIndex].content
                                            :
                                                contentFor === 'video' &&
                                                    typeof currentColumn !== "undefined" && currentColumn.content[currentColumnContentIndex][contentIndex] && currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph
                                }
                                onChange={(event) => onChangeTextEditor(event.target.value, contentIndex, { type: 'text', for: contentFor })}
                            />
                    } */}
                    <RichTextEditor
                        className="sg-text-editor-html h-55"
                        // value={editorValue}
                        value={
                            contentFor === 'courseInfo' ?
                                RichTextEditor.createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.courseInfo.content, 'html')
                            :
                                contentFor === 'courseReq' ?
                                    RichTextEditor.createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.courseReq.content, 'html')
                                :
                                    contentFor === 'listModal' ?
                                        RichTextEditor.createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output[activeListModalOutputIndex].content, 'html')
                                    :
                                        contentFor === 'video' ?
                                            RichTextEditor.createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph, 'html')
                                        :
                                            contentFor === 'contentArea' ?
                                            RichTextEditor.createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output, 'html')
                                        :
                                            editorValue
                        }
                        onChange={handleChange}
                    />
                    <div className="sg-workspace-expander-head-label mt-1">
                        <span>HTML</span>
                    </div>
                    <textarea
                        className="sg-text-editor-html mt-1 h-40 border-top"
                        value={value}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

export default HtmlEditor;
