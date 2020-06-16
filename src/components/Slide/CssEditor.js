import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-xcode";

class CssEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: typeof this.props.currentColumn !== "undefined" ? 
                        'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ? 
                            this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0  ?
                                this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].css 
                            :
                                ''
                        : 
                            '' 
                    : 
                        '',
        };

        this.setCssValue = this.setCssValue.bind(this);
    }

    setCssValue = (value) => {
        this.setState({
            value: value,
        });
    }

    render() {
        return (
            <div className={this.props.showCssEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-code-editor-wrapper sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-code-editor-wrapper"}>
                <div className="sg-workspace-expander-head">
                    <div className="sg-workspace-expander-head-label">
                        <span>Element CSS</span>
                    </div>
                    <div className="sg-workspace-expander-head-actions">
                        <button 
                            type="button" 
                            className="sg-close" 
                            onClick={() => {
                                    // this.props.onChangeTextArea(this.state.value, this.props.contentIndex, 'css');
                                    this.props.setApplyCss(true);
                                }
                            }
                        >
                            <FontAwesomeIcon icon={faCheck}/>
                        </button>
                        <button 
                            type="button" 
                            className="sg-close" 
                            onClick={() => {
                                    this.props.setShowCssEditor(false, this.props.contentIndex);
                                    // this.setState({
                                    //     value: ''
                                    // })
                                }
                            }
                        >
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </div>
                </div>
                <div className="sg-workspace-expander-body">
                    <div className="sg-inline-code-editor h-100">
                        <AceEditor
                            placeholder={"Please write like:\nproperty: value;\n\nExample:\nbackground: red;\nfont-size: 15px;"}
                            mode="css"
                            theme="xcode"
                            name="blah2"
                            onLoad={this.onLoad}
                            onChange={(event) => {
                                    // this.setCssValue(event);
                                    this.props.onChangeTextArea(event, this.props.contentIndex, 'css');
                                }
                            }
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
                            // value={this.state.value}
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
