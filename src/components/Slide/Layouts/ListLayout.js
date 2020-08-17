import React from 'react';

function ListLayout(props) {

    const { list } = props;

    return (
        <div id="list-ul-layout" className={"w-100 h-100 p-3 " + multipleChoiceStyles.multipleChoiceTextColor} style={{ background: multipleChoiceStyles.questionBackgroundColor, }}>
            <ul className="list-ul-entries">
                {
                    list.length > 0 ?
                        list.map((item, itemIndex) => (
                            <li key={itemIndex}>
                                {item.entry}
                                <ul className="list-ul-sub-entries">
                                    {list.map((subItem, subItemIndex) => (
                                        <li key={subItemIndex}>
                                            {subItem.entry}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    :
                        <div>
                            <span>No content added.</span>
                        </div>
                }
            </ul>
        </div>
    );
}

export default ListLayout;
