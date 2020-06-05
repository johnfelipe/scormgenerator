import React, { Component } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
// import { Formik } from "formik";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

// Gallery Components
import MediaUploader from '../Gallery/MediaUploader';
import MediaLoader from '../Gallery/MediaLoader';

class GalleryHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            key: 'uploadFiles',
            mediaFiles: [],
            mediaUrls: [],
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.setKey = this.setKey.bind(this);
        this.setMediaFiles = this.setMediaFiles.bind(this);
        this.setMediaUrls = this.setMediaUrls.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
    }

    componentDidUpdate = () => {
        console.log("Media Files: ");
        console.log(this.props.mediaFilesObject);
        console.log("Media Urls:");
        console.log(this.state.mediaUrls);
    }

    setKey = (key) => {
        this.setState({
            key: key,
        })
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    setMediaFiles = (fileObject, fileIndex) => {
        const mediaFile = fileObject;
        const mediaFiles = this.state.mediaFiles;
        mediaFiles[fileIndex] = mediaFile;

        this.props.galleryHandler(mediaFiles);
        this.props.addMediaFiles(mediaFiles);

        this.setState({
            mediaFiles: mediaFiles,
        })
    }

    setMediaUrls = (fileUrl) => {
        const mediaUrl = fileUrl;

        this.setState({
            mediaUrls: [...this.state.mediaUrls, mediaUrl]
        })
    }

    deleteMedia = (mediaIndex) => {
        const mediaFiles = this.state.mediaFiles;
        mediaFiles.splice(mediaIndex, 1);

        const mediaUrls = this.state.mediaUrls;
        mediaUrls.splice(mediaIndex, 1);

        this.props.galleryHandler(mediaFiles);
        this.props.addMediaFiles(mediaFiles);

        this.setState({
            mediaFiles: mediaFiles,
            mediaUrls: mediaUrls,
        })
    }

    render() {

        const galleryModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="gallery-modal w-90"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Media
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.key}
                        onSelect={(k) => this.setKey(k)}
                    >
                        <Tab eventKey="uploadFiles" title="Upload Files">
                            <MediaUploader setMediaFiles={this.setMediaFiles} setMediaUrls={this.setMediaUrls} />
                        </Tab>
                        <Tab eventKey="mediaLibrary" title="Media Library">
                            {
                                this.state.mediaUrls.length > 0 ?
                                    <MediaLoader mediaUrls={this.state.mediaUrls} deleteMedia={this.deleteMedia}/>
                                :
                                    <div className="p-3">No files found</div>
                            }
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        );

        return (
            <div id="gallery-btn-container">
                <label htmlFor="galleryBtn" className="mr-2">Add Gallery Files:</label>
                <button type="button" className="btn btn-outline-dark" onClick={() => this.setModalShow(true)}>Gallery</button>
                {galleryModal}
            </div>
        )
    }
}

export default GalleryHandler;
