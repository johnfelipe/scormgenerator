import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCode, faEdit } from '@fortawesome/free-solid-svg-icons';
import RichTextEditor, { createValueFromString, createEmptyValue, getTextAlignBlockMetadata, getTextAlignClassName, getTextAlignStyles } from 'react-rte';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function HtmlEditor(props) {

    const { currentColumn, contentIndex, currentColumnContentIndex, contentFor, activeOutputIndex } = props;
    const [editorValue, setEditorValue] = useState(createEmptyValue());
    const [editorOnly, setEditorOnly] = useState("true");

    const handleChange = value => {
        setEditorValue(value);

        const currentColumnObj = currentColumn;

        if (contentFor === 'courseInfo') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = value.toString("html");
        } else if (contentFor === 'courseReq') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = value.toString("html");
        } else if (contentFor === 'listModal') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content = value.toString("html");
        } else if (contentFor === 'video') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.paragraph = value.toString("html");
        } else if (contentFor === 'contentArea') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output = value.toString("html");
        } else if (contentFor === 'tabsContent') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].tabContent = value.toString("html");
        } else if (contentFor === 'accordion') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content = value.toString("html");
        } else if (contentFor === 'contentPicture') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.content = value.toString("html");
        }

        props.setColumn(currentColumnObj);
    };

    const onChangeSource = (event) => {
        let source = event.target.value;
        let oldValue = editorValue;

        setEditorValue(oldValue.setContentFromString(source, 'html', {customBlockFn: getTextAlignBlockMetadata}));

        const currentColumnObj = currentColumn;

        if (contentFor === 'courseInfo') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = source;
        } else if (contentFor === 'courseReq') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = source;
        } else if (contentFor === 'listModal') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content = source;
        } else if (contentFor === 'video') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.paragraph = source;
        } else if (contentFor === 'contentArea') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output = source;
        } else if (contentFor === 'tabsContent') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].tabContent = source;
        } else if (contentFor === 'accordion') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content = source;
        } else if (contentFor === 'contentPicture') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.content = source;
        }

        props.setColumn(currentColumnObj);
    }

    useEffect(() => {
        if (contentFor === 'courseInfo') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.courseInfo.content, 'html'));
        } else if (contentFor === 'courseReq') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.courseReq.contentFor, 'html'));
        } else if (contentFor === 'listModal') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content, 'html'));
        } else if (contentFor === 'video') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph, 'html'));
        } else if (contentFor === 'contentArea') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output, 'html'));
        } else if (contentFor === 'tabsContent') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].tabContent, 'html'));
        } else if (contentFor === 'accordion') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content, 'html'));
        } else if (contentFor === 'contentPicture') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.content, 'html'));
        }
    }, [contentFor, currentColumnContentIndex, contentIndex, activeOutputIndex, currentColumn]);

    return (
        <div className={props.showHtmlEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor"}>
            <div className="sg-workspace-expander-head">
                <div className="sg-workspace-expander-head-label">
                    {editorOnly === "true" ?
                        <span>Rich Text Editor/HTML</span>
                    :
                        <span>HTML</span>
                    }
                </div>
                <div className="sg-workspace-expander-head-actions">
                    <OverlayTrigger
                        key="top-editor"
                        placement="top"
                        overlay={
                            <Tooltip id='tooltip-top'>
                                <span>Show Editor with HTML</span>
                            </Tooltip>
                        }
                    >
                        <button
                            type="button"
                            className={editorOnly === "false" ? 'btn btn-success' : 'sg-close sg-workspace-expander-head-button'}
                            onClick={() => {
                                if (editorOnly !== "false") {
                                    setEditorOnly("false");
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faCode}/>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key="top-html"
                        placement="top"
                        overlay={
                            <Tooltip id='tooltip-top'>
                                <span>Show Editor only</span>
                            </Tooltip>
                        }
                    >
                        <button
                            type="button"
                            className={editorOnly === "true" ? 'btn btn-success' : 'sg-close sg-workspace-expander-head-button'}
                            onClick={() => {
                                if (editorOnly !== "true") {
                                    setEditorOnly("true");
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faEdit}/>
                        </button>
                    </OverlayTrigger>
                    <button
                        type="button"
                        className="sg-close sg-workspace-expander-head-button"
                        onClick={() => {
                            props.setShowEditor(false, contentIndex);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
            </div>
            <div className="sg-workspace-expander-body">
                <div className="sg-text-editor sg-text-editor-mode-html h-100">
                    <RichTextEditor
                        className={editorOnly === "true" ? "sg-text-editor-html h-100" : "sg-text-editor-html h-55"}
                        editorClassName={editorOnly === "true" ? "sg-text-editor-html h-74-5" : "sg-text-editor-html h-54-5"}
                        value={editorValue}
                        onChange={handleChange}
                        autoFocus={true}
                        blockStyleFn={getTextAlignClassName}
                    />
                    {editorOnly === "false" &&
                        <>
                            <div className="sg-workspace-expander-head-label mt-1 mb-1">
                                <span>HTML</span>
                            </div>
                            <textarea
                                className={editorOnly === "false" ? "sg-text-editor-html h-40 border-top" : "sg-text-editor-html h-100 border-top"}
                                value={editorValue.toString('html', {blockStyleFn: getTextAlignStyles})}
                                onChange={onChangeSource}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default HtmlEditor;
