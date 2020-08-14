import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function ImageLayout(props) {

    const { output } = props;

    return (
        <div id="image-layout">
            <div className="image-container h-100 w-100 border border-light">
                {output.url !== '' ?
                    <>
                        <img className="w-100 h-auto" src={output.url} alt={output.alt}/>
                        {output.paragraph &&
                            <div className="mt-3 p-3">
                                {ReactHtmlParser(output.paragraph)}
                            </div>
                        }
                    </>
                :
                    <span>No image added yet.</span>
                }
            </div>
        </div>
    );
}

export default ImageLayout;
