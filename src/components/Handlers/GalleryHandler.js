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
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.setKey = this.setKey.bind(this);
        this.setMediaFiles = this.setMediaFiles.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
    }

    componentDidUpdate = () => {
        console.log("Media Files: ");
        console.log(this.props.mediaFilesObject);
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

    setMediaFiles = (fileObject) => {
        const mediaFile = fileObject;
        let mediaFiles = [...this.state.mediaFiles, mediaFile];

        this.props.galleryHandler(mediaFiles);
        this.props.addMediaFiles(mediaFiles);

        this.setState({
            mediaFiles: mediaFiles,
        })
    }

    deleteMedia = (mediaIndex) => {
        const mediaFiles = this.state.mediaFiles;
        mediaFiles.splice(mediaIndex, 1);

        this.props.galleryHandler(mediaFiles);
        this.props.addMediaFiles(mediaFiles);

        this.setState({
            mediaFiles: mediaFiles,
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
                                this.state.mediaFiles.length > 0 ?
                                    <MediaLoader mediaFiles={this.state.mediaFiles} deleteMedia={this.deleteMedia}/>
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
