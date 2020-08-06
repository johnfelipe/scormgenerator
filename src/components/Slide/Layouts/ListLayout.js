import React from 'react';

function ListLayout(props) {

    const { output } = props;
    
    return (
        <div id="list-layout">
            <div className="list-container h-100 w-100 border border-light">
                {output.length > 0 ?
                    <>
                        {output.map((item, index) => (
                            <button
                                key={'list-button-object-' + index}
                                type="button"
                                className="btn btn-primary"
                            >
                                {item.name}
                            </button>
                        ))}
                    </>
                :
                    <span>No content added yet.</span>
                }
            </div>
        </div>
    );
}

export default ListLayout;
