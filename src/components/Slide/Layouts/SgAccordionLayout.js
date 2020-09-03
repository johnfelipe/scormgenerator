import React from 'react';

function SgAccordionLayout(props) {

    const { output, style, css } = props;
    
    return (
        <>
            <div id="sg-accordion-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
                <div className="content-area-container h-100 w-100 border border-light p-3 ">
                    <h1>Sample</h1>
                    {props.cssApplier(css, 'sg-accordion-layout')}
                </div>
            </div>
        </>
    );
}

export default SgAccordionLayout;
