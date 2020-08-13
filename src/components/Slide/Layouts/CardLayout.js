import React from 'react';

function CardLayout(props) {

    const { cardOutput, cardClass, cardId, cardStyles } = props;

    return (
        <div id={cardId ? cardId : "card-layout"} className={"card " + cardClass}>
            <img className="card-img-top" src="..." alt="Card cap"/>
            <div className="card-body">
                <h5 className="card-title">{cardOutput.title}</h5>
                <p className="card-text">{cardOutput.content}</p>
                {cardOutput.button.label &&
                    <a
                        href={cardOutput.button.url}
                        className="btn btn-primary"
                        style={{ background: cardStyles.themeColor }}
                    >
                        {cardOutput.button.label}
                    </a>
                }
            </div>
        </div>
    );
}

export default CardLayout;
