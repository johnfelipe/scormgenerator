import React, { Component } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';

// Gallery Components
import MediaUploader from '../Gallery/MediaUploader';
import MediaLoader from '../Gallery/MediaLoader';

class GalleryHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            key: 'uploadFiles',
            filterType: 'all',
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.setKey = this.setKey.bind(this);
        this.setMediaFiles = this.setMediaFiles.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
        this.setFilterType = this.setFilterType.bind(this);
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

        if (value === false) {
            this.setState({
                filterType: "all",
            });
        }
    }

    setMediaFiles = (fileObject) => {
        const mediaFile = fileObject;
        let mediaFiles = [...this.props.mediaFilesObject, mediaFile];

        this.props.galleryHandler(mediaFiles);
        this.props.addMediaFiles(mediaFiles);
    }

    deleteMedia = (mediaIndex) => {
        const mediaFiles = this.props.mediaFilesObject;
        mediaFiles.splice(mediaIndex, 1);

        this.props.galleryHandler(mediaFiles);
        this.props.addMediaFiles(mediaFiles);
    }

    setFilterType = (type) => {
        this.setState({
            filterType: type,
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
                            <MediaUploader setMediaFiles={this.setMediaFiles} />
                        </Tab>
                        <Tab eventKey="mediaLibrary" title="Media Library">
                            {
                                this.props.mediaFilesObject.length > 0 ?
                                    <>
                                        <div className="gallery-toolbar">
                                            <div className="gallery-toolbar-filter">
                                                <h2 className="gallery-filter-heading">Filter Gallery</h2>
                                                <select id="gellery-attachment-filters" onChange={(e) => this.setFilterType(e.target.value)} className="gallery-filters">
                                                    <option value="all">All media items</option>
                                                    <option value="image">Images</option>
                                                    <option value="audio">Audio</option>
                                                    <option value="video">Video</option>
                                                </select>
                                            </div>
                                        </div>
                                        <MediaLoader mediaFiles={this.props.mediaFilesObject} deleteMedia={this.deleteMedia} filterType={this.state.filterType}/>
                                    </>
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
                {this.props.location === "home" ?
                    <>
                        <label htmlFor="galleryBtn" className="mr-2">Add Gallery Files:</label>
                        <button type="button" className="btn btn-outline-dark" onClick={() => this.setModalShow(true)}>Gallery</button>
                    </>
                :
                    <>
                        <button type="button" className="btn btn-outline-dark" onClick={() => this.setModalShow(true)}>Gallery</button>
                    </>
                }
                {galleryModal}
            </div>
        )
    }
}

export default GalleryHandler;
