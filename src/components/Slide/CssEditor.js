import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// import {Controlled as CodeMirror} from 'react-codemirror2';
// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
// require('codemirror/theme/neat.css');
// require('codemirror/mode/xml/xml.js');
// require('codemirror/mode/javascript/javascript.js');

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-xcode";

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
                        {/* <button type="button" className="sg-expand" onClick={() => console.log('This will expand')}>
                            <FontAwesomeIcon icon={faCaretRight}/>
                        </button> */}
                    </div>
                </div>
                <div className="sg-workspace-expander-body">
                    <div className="sg-inline-code-editor h-100">
                        {/* <CodeMirror
                            className="h-100"
                            value={this.state.value}
                            options={{
                                mode: 'javascript',
                                theme: 'material',
                                lineNumbers: true
                            }}
                            onBeforeChange={(editor, data, value) => {
                                this.setState({value});
                            }}
                            onChange={(editor, value) => {
                                console.log('controlled', {value});
                            }}
                        /> */}

                        {/* <textarea
                            className="sg-text-editor-css"
                            value={ this.state.value }
                            onChange={(event) => this.props.onChangeTextArea(event, this.props.contentIndex)}
                        /> */}

                        <AceEditor
                            placeholder="Write css code here. . ."
                            mode="css"
                            theme="xcode"
                            name="blah2"
                            onLoad={this.onLoad}
                            onChange={(event) => this.props.onChangeTextArea(event, this.props.contentIndex, 'css')}
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={ 
                                typeof this.props.currentColumn !== "undefined" ? 
                                    'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ? 
                                        this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0  ?
                                            this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].css 
                                        :
                                            ''
                                    : 
                                        '' 
                                : 
                                    ''
                            }
                            setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                            className='h-100 w-100'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default CssEditor;
