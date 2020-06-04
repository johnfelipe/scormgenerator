import React, { Component } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
// import { Formik } from "formik";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

// Gallery Components
// import ImageUploader from '../Gallery/ImageUploader';

class GalleryHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            key: 'uploadFiles',
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.setKey = this.setKey.bind(this);
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
                            Tab 1
                        </Tab>
                        <Tab eventKey="mediaLibrary" title="Media Library">
                            Tab 2
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
