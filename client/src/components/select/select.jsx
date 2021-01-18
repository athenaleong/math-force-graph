import React from 'react';
import Select from 'react-select';
import {SelectStyled} from './style';
import {colorArray, greyArray} from '../../color'


function ToggleDagMode(props) {
    const {setDagMode} = props;

    const options = [
        {label: "Radial", value: "radial"},
        {label: "Top Down", value: "td"},
        {label: "Left Right", value: "lr"}
    ]
    
    const onChange = (selected) => {
        setDagMode(selected['value']);
    }
    return (
        <SelectStyled
            isMulti={false}
            isSearchable={false}
            defaultValue={{label: "Radial", value: "radial"}}
            options={options}
            onChange={onChange}
            classNamePrefix={'Select'}
            theme={theme => ({
                ...theme,
                borderRadius: 12,
                colors: {
                  ...theme.colors,
                  primary25: greyArray[5],
                  primary: greyArray[5],
                  primary50: greyArray[4]
            },})}
        />
    );

}

export default ToggleDagMode;