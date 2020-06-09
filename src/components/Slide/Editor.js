import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShownTextArea: false,
            radioValue: -1,
        };
        
        this.setIsShown = this.setIsShown.bind(this);
        this.deleteFeature = this.deleteFeature.bind(this);
        this.radioClick = this.radioClick.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.setMediaFiles = this.setMediaFiles.bind(this);
    }

    setIsShown = (value) => {
        this.setState({
            isShownTextArea: value,
        })
    }

    deleteFeature = () => {
        this.props.deleteFeature(this.props.contentIndex);
    }

    radioClick = (value, mediaObject) => {

        this.props.onChangeRadio(mediaObject.dataUrl, mediaObject.type, this.props.contentIndex);

        this.setState({
            radioValue: value,
        })
    }

    handleFileUpload = (e) => {
        e.preventDefault();
        let files = e.target.files;

        this.setState({
            showSuccessMsg: true,
        })

        // eslint-disable-next-line
        Object.keys(files).map((fileIndex) => {

            let reader = new FileReader();

            const fileObject = {
                name: files[fileIndex].name.split(".")[0],
                extension: files[fileIndex].name.split(".")[1],
                size: files[fileIndex].size,
                type: files[fileIndex].type,
                lastModified: files[fileIndex].lastModified,
                lastModifiedDate: files[fileIndex].lastModifiedDate,
            };

            reader.readAsDataURL(files[fileIndex])
            reader.onloadend = () => {
                fileObject.dataUrl = reader.result;
                this.setMediaFiles(fileObject);
            }
        });
    }

    setMediaFiles = (fileObject) => {
        const mediaFile = fileObject;
        let mediaFiles = [...this.props.mediaFilesObject, mediaFile];

        this.props.galleryHandler(mediaFiles);
        this.props.addMediaFiles(mediaFiles);
    }

    render() {
        const contentAreaInterface = (
            <div className="sg-controls">
                <div className="sg-control sg-inspector-actions">
                    <div className="sg-workspace-actions">
                        <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => this.deleteFeature(this.props.contentIndex)}>
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
                                        this.state.isShownTextArea ? 
                                        <button type="button" className="textarea-hover-btn btn btn-light" onMouseLeave={() => this.setIsShown(false)} onClick={() => this.props.setShowEditor(true, this.props.contentIndex)}>
                                            <span>Click to Edit</span>
                                        </button>
                                        :
                                        <span></span>
                                    }
                                    <textarea 
                                        onMouseOver={() => this.setIsShown(true)} 
                                        disabled 
                                        value={ 
                                            typeof this.props.currentColumn != "undefined" ? 
                                                'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ? 
                                                    this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ?
                                                        this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output 
                                                    :
                                                        ''
                                                : 
                                                    ''
                                            : 
                                                ''
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sg-control sg-control-group">
                    <div className="sg-control-header">
                        <label>Customize</label>
                    </div>
                    <div className="sg-control-input sg-control-input">
                        <ul className="sg-control-input-list">
                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                <div className="sg-control-input-list-label">
                                    <span>ID</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <input
                                        type="text"
                                        placeholder=""
                                        onChange={(event) => this.props.setFeatureId(event, this.props.contentIndex)}
                                        value={ 
                                            typeof this.props.currentColumn != "undefined" ? 
                                                'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ? 
                                                    this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ?
                                                        this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].id 
                                                    :
                                                        ''
                                                : 
                                                    ''
                                            : 
                                                ''
                                        }
                                    />
                                </div>
                            </li>
                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                <div className="sg-control-input-list-label">
                                    <span>Class</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <input
                                        type="text"
                                        placeholder=""
                                        onChange={(event) => this.props.setFeatureClass(event, this.props.contentIndex)}
                                        value={ 
                                            typeof this.props.currentColumn != "undefined" ? 
                                                'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ? 
                                                    this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ?
                                                        this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].class 
                                                    :
                                                        ''
                                                : 
                                                    ''
                                            : 
                                                ''
                                        }
                                    />
                                </div>
                            </li>
                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                <div className="sg-control-input-list-label">
                                    <span>Element CSS</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <div className="sg-expandable-code-editor">
                                        <div className="sg-workspace-expander">
                                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => this.props.setShowCssEditor(true, this.props.contentIndex)}>
                                                    <span>Add CSS</span>
                                                </button>
                                                <input type="text" value="" disabled className="rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );

        const audioInterface = (
            <div className="sg-controls">
                <div className="sg-control sg-inspector-actions">
                    <div className="sg-workspace-actions">
                        <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => this.deleteFeature(this.props.contentIndex)}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
                <div className="sg-control sg-control-text-editor">
                    <div className="sg-control-header">
                        <label>Content Setup</label>
                    </div>
                    <div className="sg-control-input">
                        <ul className="sg-control-input-list">
                            <li className="sg-control-input-list-item sg-control-input-list-item-textarea">
                                <div className="sg-control-input-list-label">
                                    {/* <span>Choose Audio</span> */}
                                    <span>Embed Code</span>
                                </div>
                                <div className="sg-control-input-list-input sg-control-input-list-input-height-5 p-2">
                                    <textarea
                                        placeholder="Put embed code here . . ."
                                        className="sg-input-code"
                                        style={{fontSize: 10}}
                                        value={ 
                                            typeof this.props.currentColumn != "undefined" ? 
                                                'content' in this.props.currentColumn && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ? 
                                                    this.props.currentColumnContentIndex in this.props.currentColumn.content && this.props.currentColumn.content[this.props.currentColumnContentIndex].length > 0 ?
                                                        this.props.currentColumn.content[this.props.currentColumnContentIndex][this.props.contentIndex].output 
                                                    :
                                                        ''
                                                : 
                                                    ''
                                            : 
                                                ''
                                        }
                                        onChange={(event) => this.props.onChangeTextArea(event, this.props.contentIndex)}
                                    />
                                    {/* <ul className="audio-feature-value-list pl-0">
                                        {
                                            this.props.mediaFilesObject.length > 0 ?
                                                this.props.mediaFilesObject.map((mediaFile, mediaIndex)=> (
                                                    mediaFile.type.includes("audio") ?
                                                        <li key={mediaIndex} className="audio-feature-value-list-item">
                                                            <input type="radio" value={mediaIndex} onClick={() => this.radioClick(mediaIndex, mediaFile)} checked={this.state.radioValue === mediaIndex ? true : false} />
                                                            <label className="pl-1">{mediaFile.name}</label>
                                                        </li>
                                                    :
                                                        null
                                                ))
                                            :
                                                <div className="w-100">
                                                    <input
                                                        type="file"
                                                        onChange={this.handleFileUpload}
                                                        accept="audio/*"
                                                        multiple
                                                    />
                                                </div>
                                        }
                                    </ul> */}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sg-control sg-control-group">
                    <div className="sg-control-header">
                        <label>Customize</label>
                    </div>
                    <div className="sg-control-input sg-control-input">
                        <ul className="sg-control-input-list">
                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                <div className="sg-control-input-list-label">
                                    <span>ID</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <input
                                        type="text"
                                        placeholder=""
                                        onChange={(event) => this.props.setFeatureId(event, this.props.contentIndex)}
                                        value={ 
                                            typeof this.props.currentColumn != "undefined" ? 
                                                'content' in this.props.currentColumn && this.props.currentColumn.content.length > 0 ? 
                                                this.props.currentColumn.content[this.props.contentIndex].id 
                                                : 
                                                ''
                                            : 
                                            '' 
                                        }
                                    />
                                </div>
                            </li>
                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                <div className="sg-control-input-list-label">
                                    <span>Class</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <input
                                        type="text"
                                        placeholder=""
                                        onChange={(event) => this.props.setFeatureClass(event, this.props.contentIndex)}
                                        value={ 
                                            typeof this.props.currentColumn != "undefined" ? 
                                                'content' in this.props.currentColumn && this.props.currentColumn.content.length > 0 ? 
                                                this.props.currentColumn.content[this.props.contentIndex].class 
                                                : 
                                                ''
                                            : 
                                            '' 
                                        }
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
        
        const message = (
            <div className="sg-workspace-content">
                <div className="sg-workspace-message">
                    <h3>Nothing Selected</h3>
                    <p>Click on an element in the site preview to begin inspecting it.</p>
                </div>
            </div>
        );

        return (
            <div className="sg-scroll-box sg-workspace-controls ps">
                {
                    this.props.feature === "audio" ?
                        audioInterface
                    :
                        this.props.feature === "content-area" ?
                            contentAreaInterface
                        :
                            message
                }
            </div>
        )
    }
}

export default Editor;
