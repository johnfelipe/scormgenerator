import React from 'react';

function ContentWithLeftPictureLayout(props) {

    const { output, style, css } = props;
    
    return (
        <>
            <div id="content-picture-left-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
                <div className="content-area-container h-100 w-100 border border-light p-3 ">
                    <span>Sample layout</span>
                    {props.cssApplier(css, 'audio-layout')}
                </div>
            </div>
        </>
    );
}

export default ContentWithLeftPictureLayout;
