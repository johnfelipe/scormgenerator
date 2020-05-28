import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import {Controlled as CodeMirror} from 'react-codemirror2';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';

class CssEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'this is still work in progress and edits will not reflect',
        };
    }

    render() {
        return (
            <div className={this.props.showCssEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-code-editor-wrapper sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-code-editor-wrapper"}>
                <div className="sg-workspace-expander-head">
                    <div className="sg-workspace-expander-head-label">
                        <span>Element CSS</span>
                    </div>
                    <div className="sg-workspace-expander-head-actions">
                        <button type="button" className="sg-close" onClick={() => this.props.setShowCssEditor(false, this.props.contentIndex)}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </div>
                </div>
                <div className="sg-workspace-expander-body">
                    <div className="sg-inline-code-editor h-100">
                        {/* <CodeMirror
                            className="h-100"
                            value={this.state.value}

                            options={{
                                mode: 'css',
                                theme: 'material',
                                lineNumbers: true
                            }}

                            onBeforeChange={(editor, data, value) => {
                                this.setState({
                                    sampleValue: value,
                                });
                            }}

                            onChange={(editor, data, value) => {
                                console.log(editor);
                                console.log(data);
                                console.log(value);
                            }}
                        /> */}

                        <textarea
                            className="sg-text-editor-css"
                            value={ this.state.value }
                            onChange={(event) => this.props.onChangeTextArea(event, this.props.contentIndex)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default CssEditor;
