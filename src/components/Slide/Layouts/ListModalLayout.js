import React from 'react';

// components
import ListButtonModals from '../Features/List/ListButtonModals';

function ListModalLayout(props) {

    const { output, styles } = props;
    
    return (
        <div id="list-layout" style={{ backgroundImage: 'url("' + styles.backgroundImg.url + '")', backgroundSize: 'cover' }}>
            <div className={"list-container h-100 w-100 border border-light p-3 " + styles.btnPosition}>
                {output.length > 0 ?
                    <>
                        {output.map((item, index) => (
                            <ListButtonModals
                                item={item}
                                index={index}
                                styles={styles}
                            />
                        ))}
                    </>
                :
                    <span>No content added yet.</span>
                }
            </div>
        </div>
    );
}

export default ListModalLayout;
