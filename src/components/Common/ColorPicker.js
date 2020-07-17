import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

function ColorPicker(props) {

    const [currentColor, setCurrentColor] = useState(props.defaultColor);
    const classNames = props.classNames;
    const showPicker = props.showPicker;

    const setColor = (color) => {
        // color = {
        //   hex: '#333',
        //   rgb: {
        //     r: 51,
        //     g: 51,
        //     b: 51,
        //     a: 1,
        //   },
        //   hsl: {
        //     h: 0,
        //     s: 0,
        //     l: .20,
        //     a: 1,
        //   },
        // }
        setCurrentColor(color);
        props.setBackgroundColor(color.hex);
    }

    return (
        <SketchPicker
            color={currentColor}
            className={showPicker ? 'd-block ' + classNames : 'd-none ' + classNames}
            // onChangeComplete={setColor}
            onChange={setColor}
        />
    );
}

export default ColorPicker;
