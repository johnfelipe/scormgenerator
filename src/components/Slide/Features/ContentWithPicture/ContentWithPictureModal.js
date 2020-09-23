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
                    {item.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ReactHtmlParser(item.content)}
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            <div
                key={'content-picture-modal-' + itemIndex}
                className="content-picture-modal-button-object"
            >
                <button
                    type="button"
                    className={"btn btn-secondary mb-2 w-100 " + styles.btnLabelAlignment}
                    style={{ background: styles.btnColor }}
                    onClick={() => {
                        setModalShow(true);
                    }}
                >
                    {item.name}
                </button>
            </div>
            {contentModal}
        </>
    );
}

export default ContentWithPictureModal;
