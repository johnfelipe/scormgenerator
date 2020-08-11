import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

function ListButtonModals(props) {

    const { item, index, styles } = props;
    const [modalShow, setModalShow] = useState(false);

    const buttonModal = (
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
            {styles.btnWidth === 0 ?
                <div
                    key={'list-button-object-' + index}
                    className="list-modal-button-object"
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
            :
                <div
                    key={'list-button-object-' + index}
                    className="list-modal-button-object"
                >
                    <button
                        type="button"
                        className={"btn btn-secondary mb-2 " + styles.btnLabelAlignment}
                        style={{ width: styles.btnWidth + '%', background: styles.btnColor }}
                        onClick={() => {
                            setModalShow(true);
                        }}
                    >
                        <span>
                            {item.name}
                        </span>
                    </button>
                </div>
            }
            {buttonModal}
        </>
    );
}

export default ListButtonModals;