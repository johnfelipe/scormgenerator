import React from 'react';
import { Modal } from 'react-bootstrap';

function ChangeGrid (props) {

    const modalShow = props.modalShow;

    const confirmationModal = (
        <Modal
            show={modalShow}
            onHide={() => props.setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Warning
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Features exists in this column grid. Do you want to remove all features and change grid size?</span>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        props.setRemoveFeaures(true);
                        props.setModalShow(false);
                    }}
                >
                    Yes
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        props.setRemoveFeaures(false);
                        props.setModalShow(false);
                    }}
                >
                    No
                </button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            {confirmationModal}
        </>
    );
}

export default ChangeGrid;