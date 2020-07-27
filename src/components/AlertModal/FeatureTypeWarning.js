import React from 'react';
import { Modal } from 'react-bootstrap';

function FeatureTypeWarning(props) {

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
                <span>You can only create 1 final quiz per course, do you want to continue?</span>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        props.setIsFinalQuiz(true);
                        props.setModalShow(false);
                        localStorage.setItem('isFinalQuizSet', true);
                    }}
                >
                    Yes
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        props.setIsFinalQuiz(false);
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

export default FeatureTypeWarning;
