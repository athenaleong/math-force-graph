import styled from 'styled-components';
import Select from "react-select";
import {colorArray, greyArray} from '../../color'

export const SelectStyled = styled(Select)`
    outline:none;
    width: 16vw;
    

    & > .Select__control {
        border: 2px solid #f2f2f2;
        border-radius: 12px;
    }

    & .Select__control--is-focused {
        box-shadow: none;

    }

    & .Select__option--is-focused {
        background-color: ${greyArray[5]};
    }

    .Select__single-value {
        border: none;
    }

    .Select__option--is-selected {
        background-color: ${greyArray[4]};
        color: black;

    }
    
`;