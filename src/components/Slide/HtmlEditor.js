import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from 'react-rte';

class HtmlEditor extends Component {

    state = {
        value: RichTextEditor.createEmptyValue()
    }
    
    // const currentColumn = props.currentColumn;
    // const contentIndex = props.contentIndex;
    // const currentColumnContentIndex = props.currentColumnContentIndex;
    // const contentFor = props.contentFor;
    // const activeListModalOutputIndex = props.activeListModalOutputIndex;
    // const [value, setValue] = useState(RichTextEditor.createEmptyValue());

    onChangeTextEditor = (value, contentIndex, editorType) => {
        const currentColumnObj = this.props.currentColumn;

        if (editorType.type === 'text') {
            if (editorType.for === 'courseInfo') {
                currentColumnObj.content[this.props.currentColumnContentIndex][contentIndex].output.courseInfo.content = value;
            } else if (editorType.for === 'courseReq') {
                currentColumnObj.content[this.props.currentColumnContentIndex][contentIndex].output.courseReq.content = value;
            } else if (editorType.for === 'listModal') {
                currentColumnObj.content[this.props.currentColumnContentIndex][contentIndex].output[this.props.activeListModalOutputIndex].content = value;
            } else if (editorType.for === 'video') {
                currentColumnObj.content[this.props.currentColumnContentIndex][contentIndex].output.paragraph = value;
            }
        }

        this.props.setColumn(currentColumnObj);
    }

    onChange = (value) => {
        this.setState({value});
        // if (this.props.onChange) {
        //   // Send the changes up to the parent component as an HTML string.
        //   // This is here to demonstrate using `.toString()` but in a real app it
        //   // would be better to avoid generating a string on each change.
        //   this.props.onChange(
        //     value.toString('html')
        //   );
        // }
    };

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
                        {/* {
                            this.props.contentFor === '' ?
                                <textarea
                                    className="sg-text-editor-html"
                                    value={ 
                                        typeof this.props.currentColumn !== "undefined" &&
                                        'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 &&
                                        this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0  &&
                                        this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output
                                    }
                                    onChange={(event) => this.props.onChangeTextArea(event.target.value, this.props.contentIndex, 'html')}
                                />
                            :
                                <textarea
                                    className="sg-text-editor-html"
                                    value={
                                        this.props.contentFor === 'courseInfo' ?
                                            typeof this.props.currentColumn !== "undefined" && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex] && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output.courseInfo.content
                                        :
                                            this.props.contentFor === 'courseReq' ?
                                                typeof this.props.currentColumn !== "undefined" && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex] && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output.courseReq.content
                                            :
                                                this.props.contentFor === 'listModal' ?
                                                    typeof this.props.currentColumn !== "undefined" && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex] && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output[this.props.activeListModalOutputIndex].content
                                                :
                                                    this.props.contentFor === 'video' &&
                                                        typeof this.props.currentColumn !== "undefined" && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex] && this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output.paragraph
                                    }
                                    onChange={(event) => this.onChangeTextEditor(event.target.value, this.props.contentIndex, { type: 'text', for: this.props.contentFor })}
                                />
                        } */}
                        <RichTextEditor
                            className="sg-text-editor-html h-100"
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default HtmlEditor;
