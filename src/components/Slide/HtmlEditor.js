import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class HtmlEditor extends Component {

    render() {
        return (
            <div className={this.props.showHtmlEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor"}>
                <div className="sg-workspace-expander-head">
                    <div className="sg-workspace-expander-head-label">
                        <span>HTML</span>
                    </div>
                    <div className="sg-workspace-expander-head-actions">
                        <button type="button" className="sg-close" onClick={() => this.props.setShowEditor(false, this.props.contentIndex)}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </div>
                </div>
                <div className="sg-workspace-expander-body">
                    <div className="sg-text-editor sg-text-editor-mode-html h-100">
                        <textarea
                            className="sg-text-editor-html"
                            value={ 
                                typeof this.props.currentColumn !== "undefined" ? 
                                    'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ? 
                                        this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0  ?
                                            this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output 
                                        :
                                            ''
                                    : 
                                        '' 
                                : 
                                    ''
                            }
                            onChange={(event) => this.props.onChangeTextArea(event, this.props.contentIndex, 'html')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default HtmlEditor;
