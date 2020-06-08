import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faFileVideo, faTrash } from '@fortawesome/free-solid-svg-icons';

class MediaLoader extends Component {

    constructor(props) {
        super(props);
        
        this.itemClick = this.itemClick.bind(this);
    }

    itemClick = (itemId) => {
        const elem = document.getElementById(itemId);
        const prevItemId = localStorage.getItem('prevItemId');

        if (((prevItemId === null) || (prevItemId !== null)) && (elem !== null)) {
            localStorage.setItem('prevItemId', itemId);
            elem.focus();
            elem.classList.add("details");
            elem.classList.add("selected");
        } 

        if ((prevItemId !== itemId) && (prevItemId !== null)) {
            const prevElem = document.getElementById(prevItemId);

            if (prevElem !== null) {
                prevElem.classList.remove("details");
                prevElem.classList.remove("selected");
            }
        }
    }

    render() {

        return (
            <ul className="media-library-list w-100">
                {
                    this.props.mediaFiles.map((fileData, fileIndex) => (
                        fileData.type.includes("image") ?
                            <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                                <div className="media-preview" onClick={() => this.itemClick('item-' + fileIndex)}>
                                    <div className="thumbnail">
                                        <div className="centered">
                                            <img src={fileData.dataUrl} alt={fileData.name}/>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="check" onClick={() => this.props.deleteMedia(fileIndex)}>
                                    <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                </button>
                            </li>
                        :
                            fileData.type.includes("audio") ?
                                <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                                    <div className="media-preview" onClick={() => this.itemClick('item-' + fileIndex)}>
                                        <div className="thumbnail">
                                            <FontAwesomeIcon icon={faFileAudio} className="w-100 h-40 mt-3"/>
                                            <div className="audio">
                                                <div>{fileData.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="check" onClick={() => this.props.deleteMedia(fileIndex)}>
                                        <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                    </button>
                                </li>
                            :
                                <li key={fileIndex} id={'item-' + fileIndex} className="media-library-list-item">
                                    <div className="media-preview" onClick={() => this.itemClick('item-' + fileIndex)}>
                                        <div className="thumbnail">
                                            <FontAwesomeIcon icon={faFileVideo} className="w-100 h-40 mt-3"/>
                                            <div className="video">
                                                <div>{fileData.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="check" onClick={() => this.props.deleteMedia(fileIndex)}>
                                        <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                    </button>
                                </li>
                    ))
                }
            </ul>
        )
    }

}

export default MediaLoader;