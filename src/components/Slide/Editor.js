import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Features
import ContentArea from './Features/ContentArea';
import Audio from './Features/Audio';

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
                        <Audio
                            deleteFeature={this.props.deleteFeature}
                                contentIndex={this.props.contentIndex}
                                currentColumn={this.props.currentColumn}
                                currentColumnContentIndex={this.props.currentColumnContentIndex}
                                onChangeTextArea={this.props.onChangeTextArea}
                                mediaFilesObject={this.props.mediaFilesObject}
                                setFeatureId={this.props.setFeatureId}
                                setFeatureClass={this.props.setFeatureClass}
                        />
                    :
                        this.props.feature === "content-area" ?
                            <ContentArea
                                deleteFeature={this.props.deleteFeature}
                                contentIndex={this.props.contentIndex}
                                setIsShown={this.props.setIsShown}
                                setShowEditor={this.props.setShowEditor}
                                currentColumn={this.props.currentColumn}
                                currentColumnContentIndex={this.props.currentColumnContentIndex}
                                setFeatureId={this.props.setFeatureId}
                                setFeatureClass={this.props.setFeatureClass}
                                setShowCssEditor={this.props.setShowCssEditor}
                            />
                        :
                            message
                }
            </div>
        )
    }
}

export default Editor;
