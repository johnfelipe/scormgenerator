import React, { Component } from 'react';

// Features
import Audio from './Features/Audio';
import ContentArea from './Features/ContentArea';
import HomePage from './Features/Homepage/HomePage';
import MultipleChoice from './Features/MultipleChoice/MultipleChoice';
import CourseObj from './Features/CourseObjectives/CourseObj';
import ListModal from './Features/List/ListModal';
import Video from './Features/Video';
import DragDrop from './Features/DragDrop/DragDrop';
import Card from './Features/Card/Card';
import Image from './Features/Image';
import List from './Features/List/List';
import Tabs from './Features/Tabs/Tabs';
import Charts from './Features/Charts/SgCharts';
import Accordion from './Features/Accordion/SgAccordion';
import ContentWithPicture from './Features/ContentWithPicture/ContentWithPicture';
import MultiCard from './Features/MultiCard/MultiCard';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radioValue: -1,
        };
        
        this.deleteFeature = this.deleteFeature.bind(this);
        this.radioClick = this.radioClick.bind(this);
        // this.handleFileUpload = this.handleFileUpload.bind(this);
        // this.setMediaFiles = this.setMediaFiles.bind(this);
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

    // handleFileUpload = (e) => {
    //     let files = e.target.files;

    //     this.setState({
    //         showSuccessMsg: true,
    //     })

    //     // eslint-disable-next-line
    //     Object.keys(files).map((fileIndex) => {

    //         let reader = new FileReader();

    //         const fileObject = {
    //             name: files[fileIndex].name.split(".")[0],
    //             extension: files[fileIndex].name.split(".")[1],
    //             size: files[fileIndex].size,
    //             type: files[fileIndex].type,
    //             lastModified: files[fileIndex].lastModified,
    //             lastModifiedDate: files[fileIndex].lastModifiedDate,
    //         };

    //         reader.readAsDataURL(files[fileIndex])
    //         reader.onloadend = () => {
    //             fileObject.dataUrl = reader.result;
    //             this.setMediaFiles(fileObject);
    //         }
    //     });
    // }

    // setMediaFiles = (fileObject) => {
    //     const mediaFile = fileObject;
    //     let mediaFiles = [...this.props.mediaFilesObject, mediaFile];

    //     this.props.setMediaFilesObject(mediaFiles);
    //     this.props.addMediaFiles(mediaFiles);
    // }

    render() {
        let editorContent;

        if (this.props.feature === "audio") {
            editorContent = (
                <Audio
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    onChangeTextArea={this.props.onChangeTextArea}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "contentArea") {
            editorContent = (
                <ContentArea
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "multipleChoice") {
            editorContent = (
                <MultipleChoice
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    slideItemId={this.props.slideItemId}
                    setShowTextEditor={this.props.setShowTextEditor}
                    setMChoiceIndex={this.props.setMChoiceIndex}
                    correctAnswers={this.props.correctAnswers}
                    uid={this.props.uid}
                    courseLayout={this.props.courseLayout}
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
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
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
                    setShowTextEditor={this.props.setShowTextEditor}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "listModal") {
            editorContent = (
                <ListModal
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    setShowTextEditor={this.props.setShowTextEditor}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "video") {
            editorContent = (
                <Video
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    setShowEditor={this.props.setShowEditor}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "dragDrop") {
            editorContent = (
                <DragDrop
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    slideItemId={this.props.slideItemId}
                    setShowTextEditor={this.props.setShowTextEditor}
                    uid={this.props.uid}
                    courseLayout={this.props.courseLayout}
                />
            );
        } else if (this.props.feature === "card") {
            editorContent = (
                <Card
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    slideItemId={this.props.slideItemId}
                    setShowTextEditor={this.props.setShowTextEditor}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "image") {
            editorContent = (
                <Image
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    setShowEditor={this.props.setShowEditor}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "list") {
            editorContent = (
                <List
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    setShowTextEditor={this.props.setShowTextEditor}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "tabs") {
            editorContent = (
                <Tabs
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    setShowTextEditor={this.props.setShowTextEditor}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                    setActiveOutputIndex={this.props.setActiveOutputIndex}
                />
            );
        } else if (this.props.feature === "sgCharts") {
            editorContent = (
                <Charts
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    setShowTextEditor={this.props.setShowTextEditor}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "accordion") {
            editorContent = (
                <Accordion
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    setShowTextEditor={this.props.setShowTextEditor}
                    resetFeature={this.props.resetFeature}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "contentPicture") {
            editorContent = (
                <ContentWithPicture
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    setShowEditor={this.props.setShowEditor}
                    uid={this.props.uid}
                />
            );
        } else if (this.props.feature === "multiCard") {
            editorContent = (
                <MultiCard
                    setColumn={this.props.setColumn}
                    deleteFeature={this.props.deleteFeature}
                    contentIndex={this.props.contentIndex}
                    setShowEditor={this.props.setShowEditor}
                    currentColumn={this.props.currentColumn}
                    currentColumnContentIndex={this.props.currentColumnContentIndex}
                    setFeatureId={this.props.setFeatureId}
                    setFeatureClass={this.props.setFeatureClass}
                    setShowCssEditor={this.props.setShowCssEditor}
                    resetFeature={this.props.resetFeature}
                    slideItemId={this.props.slideItemId}
                    setShowTextEditor={this.props.setShowTextEditor}
                    uid={this.props.uid}
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
