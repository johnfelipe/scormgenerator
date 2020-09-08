import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

function ContentWithLeftPictureLayout(props) {

    const { output, style, css } = props;
    
    return (
        <>
            <div id="content-picture-left-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
                <div className="content-area-container h-100 w-100 border border-light p-3 ">
                    <div className="row m-0">
                        <div className="col-md-6">
                            {output.image.url ?
                                <img src={output.image.url} alt={output.image.alt} />
                            :
                                <FontAwesomeIcon icon={faImage}/>
                            }
                        </div>
                        <div className="col-md-6">
                            {ReactHtmlParser(output.content)}
                        </div>
                    </div>
                    {props.cssApplier(css, 'content-picture-left-layout')}
                </div>
            </div>
        </>
    );
}

export default ContentWithLeftPictureLayout;
