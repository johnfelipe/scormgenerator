import React, { Component } from 'react';

// Features
import Audio from './Features/Audio';
import ContentArea from './Features/ContentArea';
import HomePage from './Features/Homepage/HomePage';
import Quiz from './Features/Quiz/Quiz';
import CourseObj from './Features/CourseObjectives/CourseObj';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radioValue: -1,
        };
        
        this.deleteFeature = this.deleteFeature.bind(this);
        this.radioClick = this.radioClick.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.setMediaFiles = this.setMediaFiles.bind(this);
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
        let editorContent;

        if (this.props.feature === "audio") {
            editorContent = (
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
            );
        } else if (this.props.feature === "content-area") {
            editorContent = (
                <ContentArea
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                />
            );
        } else if (this.props.feature === "quiz") {
            editorContent = (
                <Quiz
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                />
            );
        } else if (this.props.feature === "homePage") {
            editorContent = (
                <HomePage
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                />
            );
        } else if (this.props.feature === "courseObjectives") {
            editorContent = (
                <CourseObj
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                />
            );
        } else {
            editorContent = (
                <div className="sg-workspace-content">
                    <div className="sg-workspace-message">
                        <h3>Nothing Selected</h3>
                        <p>Click on an element in the site preview to begin inspecting it.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="sg-scroll-box sg-workspace-controls ps">
                {editorContent}
            </div>
        )
    }
}

export default Editor;
