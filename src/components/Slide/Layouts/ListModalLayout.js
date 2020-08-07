import React from 'react';

function ListModalLayout(props) {

    const { output, styles } = props;
    
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
                                        className={"btn btn-primary mb-2 w-100 " + styles.btnLabelAlignment}
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
                                        className={"btn btn-primary mb-2 " + styles.btnLabelAlignment}
                                        style={{ width: styles.btnWidth + '%' }}
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
        </div>
    );
}

export default ListModalLayout;
