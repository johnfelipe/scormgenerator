import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCode } from '@fortawesome/free-solid-svg-icons';
import {Controlled as CodeMirror} from 'react-codemirror2'

class CssEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '<h1>I ♥ react-codemirror2</h1>',
        };
    }

    render() {
        return (
            <div className={this.props.showCssEditor ? "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor sg-active" : "sg-workspace-expander-content sg-workspace-expander-content-vertical sg-workspace-expander-content-expandable-text-editor"}>
                <div className="sg-workspace-expander-head">
                    <div className="sg-workspace-expander-head-actions">
                        <button type="button" className="sg-active">
                            <FontAwesomeIcon icon={faCode}/>
                        </button>
                    </div>
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
                    <CodeMirror
                        value={this.state.value}

                        options={{
                            mode: 'xml',
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
                    />
                    {/* <div className="sg-inline-code-editor h-100">
                        
                        
                    </div> */}
                </div>
            </div>
        )
    }
}

export default CssEditor;
