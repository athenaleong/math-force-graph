import styled from 'styled-components';

export const Card = styled.div`
    margin-top: 16px;
    margin-left: 32px;
    margin-right: 32px;
    // height: 96px;
    flex-basis: auto;
    font-family: Sarabun;
    padding: 16px; 
    border-radius: 32px;
    background-color: ${props => props.color};
    display: flex;
    flex-direction: column;
    justify-content: center;
    // overflow-y: auto;
    display: inline-flex;

    :last-of-type {
        margin-bottom: 24px;
    }
    

`;

export const CardText = styled.p`
    font-family: Sarabun;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 31px;
    color: white;
    text-align:center;
    margin-top: 0px;
    vertical-align: middle;
    margin-top:6px;
    margin-bottom: 6px;

`;


