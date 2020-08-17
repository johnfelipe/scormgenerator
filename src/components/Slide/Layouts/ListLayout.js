import React from 'react';

function ListLayout(props) {

    const { list, listStyles } = props;

    return (
        <div id="list-ul-layout" className="w-100 h-100 p-3 border border-light text-left">
            <h1>{list.title}</h1>
            <ul className="list-ul-entries">
                {
                    list.entries.length > 0 ?
                        list.entries.map((item, itemIndex) => (
                            <li key={itemIndex}>
                                {item.entry}
                                <ul className="list-ul-sub-entries">
                                    {item.subEntry.map((subItem, subItemIndex) => (
                                        <li key={subItemIndex}>
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    :
                        <div>
                            <span>No entries added.</span>
                        </div>
                }
            </ul>
        </div>
    );
}

export default ListLayout;
