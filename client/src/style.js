import styled from 'styled-components';
import { greyArray } from './color';

export const Main = styled.div`
    display: flex;
    flex-direction : row;
    position: fixed;
    min-height: 100%;
    max-height: 100%;


    @media (max-width:900px) {
        flex-direction: column-reverse;

    }
`;

export const RightBox = styled.div`
    min-height: 100%;
    width: calc(100vw - 468px);
    display: flex;
    flex-direction:column;

    p {
        font-family: Sarabun;
        font-weight: 600;
        font-size: 24px;
    }

    @media (max-width:900px) {
        width: 100vw;
        min-height: 300px;


    }    
`;

export const TitleBox = styled.div`
    width: 100%;
    max-height: 10vh;
    margin-top: 36px;
    display: flex;
    flex-direction : row;
    justify-content: flex-end;
    align-items: center;


`;

export const Settings = styled.div`
    // width: 30%;
    // background-color: ${props => props.color};
    // border-radius: 32px;
    margin-right: 32px;
    display: flex;
    flex-direction: row;

    

`;

export const ResetButton = styled.button`
    border: none;
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:16px;
    background-color: transparent;
    outline: none;

    :active {
        .fa {
            transform:rotate(-360deg);
            transition:  0s;
        }
    }

    .fa {
        color: ${greyArray[2]};
        transform:rotate(0deg);
        transition: transform 0.5s;
        font-size: 20px;
    }


`;

