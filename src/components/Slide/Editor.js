import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Editor extends Component {
    render() {
        return (
            <div className="sg-scroll-box sg-workspace-controls ps">
                <div className="sg-controls">
                    <div className="sg-control sg-inspector-actions">
                        <div class="sg-workspace-actions">
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
                                    <div tabindex="-1" className="cs-workspace-expander-toggle ">

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
