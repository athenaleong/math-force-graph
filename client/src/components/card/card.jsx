import {Card, CardText} from './style';

function MilestoneCard(props) {
    const {text, color} = props

    return (
        <Card color={color}>
            <CardText>{text}</CardText>
        </Card>
    )
}

export default MilestoneCard

