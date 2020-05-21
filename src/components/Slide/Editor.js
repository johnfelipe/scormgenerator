import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
        };
        
        this.setIsShown = this.setIsShown.bind(this);
    }

    setIsShown = (value) => {
        this.setState({
            isShown: value,
        })
    }

    render() {
        return (
            <div className="sg-scroll-box sg-workspace-controls ps">
                <div className="sg-controls">
                    <div className="sg-control sg-inspector-actions">
                        <div className="sg-workspace-actions">
                            <button type="button" className="sg-workspace-action-item btn btn-link">
                                <FontAwesomeIcon icon={faTrashAlt}/>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                    <div className="sg-control sg-control-text-editor">
                        <div className="sg-control-header">
                            <label>Content</label>
                        </div>
                        <div className="sg-control-input">
                            <div className="sg-expandable-rich-text">
                                <div className="sg-workspace-expander">
                                    <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                        { 
                                            this.state.isShown ? 
                                            <button className="textarea-hover-btn" onMouseLeave={() => this.setIsShown(false)}>
                                                <span>Click to Edit</span>
                                            </button>
                                            :
                                            <span></span>
                                        }
                                        <textarea onMouseOver={() => this.setIsShown(true)} disabled value="&lt;span&gt;This content will show up directly in its container.&lt;/span&gt;"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Editor;
