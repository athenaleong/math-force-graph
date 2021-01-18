    import React from 'react';
    import {Box, InnerBox, CookieHistory, CookieCurrent} from './style';
    import MilestoneCard from '../card/card'
    import {colorArray} from '../../color';

    function InfoBar(props) {

        const {selectedNode, nodeById, cookieTrail} = props;
        console.log(`selected Node ${selectedNode}`)
        var cardList
        if (selectedNode) {
            cardList = selectedNode.childLinks.map(child => {
                var target = (child.target === 'object') ? child.target : nodeById[child.target];
                console.log(target.header);
                return <MilestoneCard text={target.header} color={colorArray[target.level - 1]} key={target.id}/>
            

            })
        }

        return (
            <Box>
                <InnerBox>
                    <CookieHistory>{cookieTrail().slice(0, -1).join(' > ')}</CookieHistory>
                    <CookieCurrent>{cookieTrail().slice(-1)}</CookieCurrent>
                    {selectedNode && cardList}
                </InnerBox>
            </Box>
        )
    }

    export default InfoBar