import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

function ContentWithPictureModal(props) {
    const { item, itemIndex } = props;
    const [modalShow, setModalShow] = useState(false);

    const contentModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {item.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ReactHtmlParser(item.content)}
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            <button
                type="button"
                className={itemIndex === 0 ? "btn btn-secondary mb-2" : "btn btn-secondary mb-2 ml-2"}
                onClick={() => {
                    setModalShow(true);
                }}
                key={'content-modal-btn-' + itemIndex}
            >
                {item.title}
            </button>
            {contentModal}
        </>
    );
}

export default ContentWithPictureModal;
