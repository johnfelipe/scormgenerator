import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function VideoLayout(props) {

    const { output } = props;

    return (
        <div id="video-layout">
            <div className="video-container h-100 w-100 border border-light">
                {output.url !== '' ?
                    <>
                        <video className="video-layout-video h-100 w-100" controls src={output.url}>
                            Your browser does not support the video tag.
                        </video>
                        <div className="mt-3 p-3">
                            {ReactHtmlParser(output.paragraph)}
                        </div>
                    </>
                :
                    <span>No video added yet.</span>
                }
            </div>
        </div>
    );
}

export default VideoLayout;
