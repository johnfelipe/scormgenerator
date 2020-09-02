import React from 'react';

function AudioLayout(props) {

    const { output, style, css } = props;
    
    return (
        <>
            {output.audio.show === 'yes' ?
                <div id="audio-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
                    <div className="content-area-container h-100 w-100 border border-light p-3 ">
                        {output.audio.url ?
                            <audio controls>
                                <source src={output.audio.url} type={output.audio.type}/>
                                Your browser does not support the audio element.
                            </audio>
                        :
                            <span>No audio uploaded.</span>
                        }
                        {props.cssApplier(css, 'audio-layout')}
                    </div>
                </div>
            :
                null
            }
        </>
    );
}

export default AudioLayout;
