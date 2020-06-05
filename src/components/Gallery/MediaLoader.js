import React, { Component } from 'react';

class MediaLoader extends Component {

    render() {

        return (
            <ul className="media-library-list w-100">
                {
                    this.props.mediaUrls.map((fileData) => (
                        <li className="media-library-list-item">
                            <div className="media-preview">
                                <div className="thumbnail">
                                    <div className="centered">
                                        <img src={fileData.dataUrl} alt={fileData.fileName}/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        )
    }

}

export default MediaLoader;