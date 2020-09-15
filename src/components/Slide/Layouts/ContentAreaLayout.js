import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function ContentAreaLayout(props) {

    const { output, style, css } = props;
    
    return (
        <div id="content-area-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
            <div className="content-area-container h-100 w-100 border border-light p-3 ">
                {ReactHtmlParser(output)}
                {props.cssApplier(css, 'content-area-layout')}
                {style.backgroundAudio.url &&
                    <audio id="content-area-bg-audio" controls autoPlay className="d-none">
                        <source src={style.backgroundAudio.url} type={style.backgroundAudio.type}/>
                        Your browser does not support the audio element.
                    </audio>
                }
            </div>
        </div>
    );
}

export default ContentAreaLayout;
