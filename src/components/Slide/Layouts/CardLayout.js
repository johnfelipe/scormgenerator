import React from 'react';

function CardLayout(props) {

    const { cardOutput, cardClass, cardId, cardStyles } = props;

    return (
        <div id={cardId ? cardId : "card-layout"} className={"card " + cardClass}>
            <img className="card-img-top border border-secondary h-auto" src={cardOutput.img.url} alt={cardOutput.img.alt}/>
            <div className="card-body">
                <h5 className="card-title">{cardOutput.title}</h5>
                <p className="card-text h-100">{cardOutput.content}</p>
                {cardOutput.button.url &&
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
