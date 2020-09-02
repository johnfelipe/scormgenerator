import React from 'react';

function AudioLayout(props) {

    const { output, style, css } = props;
    
    return (
        <div id="audio-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
            <div className="content-area-container h-100 w-100 border border-light p-3 ">
                <audio controls>
                    <source src={output.audio.url} type={output.audio.type}/>
                    Your browser does not support the audio element.
                </audio>
                {props.cssApplier(css, 'audio-layout')}
            </div>
        </div>
    );
}

export default AudioLayout;
