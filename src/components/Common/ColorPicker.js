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
            presetColors={['TRANSPARENT','#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']}
        />
    );
}

export default ColorPicker;
