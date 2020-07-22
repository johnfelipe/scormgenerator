import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function TextEditor(props) {

    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;

    return (
        <div className={props.showHtmlEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor"}>
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
                            currentColumn.content[currentColumnContentIndex][contentIndex].output && currentColumn.content[currentColumnContentIndex][contentIndex].output
                            // typeof currentColumn !== "undefined" ? 
                            //     'content' in currentColumn && currentColumn.content[currentColumnContentIndex].length > 0 ? 
                            //         currentColumnContentIndex in currentColumn.content && currentColumn.content[currentColumnContentIndex].length > 0  ?
                            //             currentColumn.content[currentColumnContentIndex][contentIndex].output 
                            //         :
                            //             ''
                            //     : 
                            //         '' 
                            // : 
                            //     ''
                        }
                        onChange={(event) => props.onChangeTextArea(event, contentIndex, 'html')}
                    />
                </div>
            </div>
        </div>
    )
}

export default TextEditor;
