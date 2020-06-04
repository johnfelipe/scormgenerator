import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
// import { Formik } from "formik";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class GalleryHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this);
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
                dialogClassName="gallery-modal w-95"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Media
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sample
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
