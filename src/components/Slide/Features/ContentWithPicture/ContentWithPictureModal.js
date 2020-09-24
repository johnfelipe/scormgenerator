import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

function ContentWithPictureModal(props) {
    const { item, itemIndex, style } = props;
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
                className={itemIndex === 0 ? "btn mb-2 " + style.modalBtnTextColor : "btn mb-2 ml-2 " + style.modalBtnTextColor}
                onClick={() => {
                    setModalShow(true);
                }}
                style={{ background: style.modalBtnColor, borderColor: style.modalBtnColor }}
                key={'content-modal-btn-' + itemIndex}
            >
                {item.title}
            </button>
            {contentModal}
        </>
    );
}

export default ContentWithPictureModal;
