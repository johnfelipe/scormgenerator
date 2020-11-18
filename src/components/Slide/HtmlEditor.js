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
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'courseReq') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'listModal') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'video') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.paragraph = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'contentArea') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'tabsContent') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].tabContent = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'accordion') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[activeOutputIndex].content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'contentPicture') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'card') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'image') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.paragraph = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'sgCharts') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.description = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'multiCardFirst') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'multiCardSecond') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'multiCardThird') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'multiCardFourth') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.content = value.toString("html", {blockStyleFn: getTextAlignStyles});
        } else if (contentFor === 'contenPictureModal') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.modal[activeOutputIndex].content = value.toString("html", {blockStyleFn: getTextAlignStyles});
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
        } else if (contentFor === 'card') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.content = source;
        } else if (contentFor === 'image') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.paragraph = source;
        } else if (contentFor === 'sgCharts') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.description = source;
        } else if (contentFor === 'multiCardFirst') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.content = source;
        } else if (contentFor === 'multiCardSecond') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.content = source;
        } else if (contentFor === 'multiCardThird') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.content = source;
        } else if (contentFor === 'multiCardFourth') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.content = source;
        } else if (contentFor === 'contenPictureModal') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.modal[activeOutputIndex].content = source;
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
        } else if (contentFor === 'card') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.content, 'html'));
        } else if (contentFor === 'image') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.paragraph, 'html'));
        } else if (contentFor === 'sgCharts') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.description, 'html'));
        } else if (contentFor === 'multiCardFirst') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.content, 'html'));
        } else if (contentFor === 'multiCardSecond') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.content, 'html'));
        } else if (contentFor === 'multiCardThird') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.content, 'html'));
        } else if (contentFor === 'multiCardFourth') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.content, 'html'));
        } else if (contentFor === 'contenPictureModal') {
            setEditorValue(createValueFromString(currentColumn.content[currentColumnContentIndex][contentIndex].output.modal[activeOutputIndex].content, 'html'));
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
                            className={editorOnly === "false" ? 'btn btn-primary' : 'sg-close sg-workspace-expander-head-button'}
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
                            className={editorOnly === "true" ? 'btn btn-primary' : 'sg-close sg-workspace-expander-head-button'}
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
                    {editorOnly === "true" ?
                        <RichTextEditor
                            className={editorOnly === "true" ? "sg-text-editor-html h-100" : "sg-text-editor-html h-55"}
                            editorClassName={editorOnly === "true" ? "sg-text-editor-html h-74-5" : "sg-text-editor-html h-54-5"}
                            value={editorValue}
                            onChange={handleChange}
                            autoFocus={true}
                            blockStyleFn={getTextAlignClassName}
                        />
                    :
                        <textarea
                            className="sg-text-editor-html border-top source"
                            value={editorValue.toString('html', {blockStyleFn: getTextAlignStyles})}
                            onChange={onChangeSource}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default HtmlEditor;
