import React from 'react';

function SgDropdownSelect(props) {

    const { selectTitle, currentValue, defaultValue, onChangeHandler, selectId, selectClassName, selectHtmlFor } = props;
    const selectOptions = props.selectOptions ? props.selectOptions : [];
    const disabled = props.disabled ? props.disabled : false;

    return (
        <div>
            <label htmlFor={selectHtmlFor} className={"mr-1 " + selectClassName}>{selectTitle}:</label>
            <select id={selectId} className="form-control d-inline w-50" value={currentValue ? currentValue : defaultValue} onChange={onChangeHandler} disabled={disabled}>
                {selectOptions.length > 0 ?
                    selectOptions.map((option, optionIndex) => (
                        <option key={'sg-select-dropdown-' + optionIndex} value={option.value}>&nbsp;{option.label}</option>
                    ))
                :
                    <option>&nbsp;No Options added.</option>
                }
            </select>
        </div>
    );
}

export default SgDropdownSelect;
