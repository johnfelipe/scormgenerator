import React from 'react';

function ListLayout(props) {

    const { output } = props;
    
    return (
        <div id="list-layout">
            <div className="list-container h-100 w-100 border border-light">
                <span>Sample</span>
            </div>
        </div>
    );
}

export default ListLayout;
