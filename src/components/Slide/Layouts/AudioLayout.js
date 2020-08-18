import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function AudioLayout(props) {

    const { output, style, css } = props;
    
    return (
        <div id="audio-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
            <div className="content-area-container h-100 w-100 border border-light p-3 ">
                {ReactHtmlParser(output)}
                {props.cssApplier(css, 'audio-layout')}
            </div>
        </div>
    );
}

export default AudioLayout;
