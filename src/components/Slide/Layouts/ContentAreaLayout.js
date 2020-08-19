import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function ContentAreaLayout(props) {

    const { output, style, css } = props;
    
    return (
        <div id="content-area-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
            <div className="content-area-container h-100 w-100 border border-light p-3 ">
                {ReactHtmlParser(output)}
                {props.cssApplier(css, 'content-area-layout')}
            </div>
        </div>
    );
}

export default ContentAreaLayout;
