import styled from 'styled-components';
import {greyArray} from '../../color'

export const Box = styled.div`
    width: 468px;
    display: flex;
    @media (min-width: 900px) {


    }
`;

export const InnerBox = styled.div`
    display: flex;
    
    @media (min-width: 900px) {
        flex-direction: column;
        margin: 36px;
        background-color: ${greyArray[5]};
        width: 100%;
        border-radius: 32px;
        overflow: scroll;

        // p {
        //     margin-top: 32px;
        //     margin-left: 32px;
        //     margin-right: 32px;
        //     oveflow-wrap: normal;
        //     // font-family: Sarabun;
        //     // font-weight: 600;
        //     // font-size: 24px; 
        //  }

    }

    
`;

export const CookieHistory = styled.div`
    margin-top: 32px;
    margin-left: 42px;
    margin-right: 32px;
    oveflow-wrap: normal;
    font-fmaily: Sarabun;
    font-weight: 400;
    font-size:16px;
    color: ${greyArray[2]}
`;

export const CookieCurrent = styled.div`
    margin-left: 42px;
    margin-right: 32px;
    margin-bottom: 16px;
    font-family: Sarabun;
    font-weight: 600; 
    font-size: 28px;
    color: ${greyArray[0]}

    // margin-block-start: 0;
    // margin-block-end:0;
`;
