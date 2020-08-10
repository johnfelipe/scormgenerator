import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function ListModalLayout(props) {

    const { output, styles } = props;

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
                    Sample title
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Sample content
            </Modal.Body>
        </Modal>
    );
    
    return (
        <div id="list-layout">
            <div className={"list-container h-100 w-100 border border-light p-3 " + styles.btnPosition}>
                {output.length > 0 ?
                    <>
                        {output.map((item, index) => (
                            styles.btnWidth === 0 ?
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
                        ))}
                    </>
                :
                    <span>No content added yet.</span>
                }
            </div>
            {buttonModal}
        </div>
    );
}

export default ListModalLayout;
