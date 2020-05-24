import React, {useState, useEffect} from 'react';
import {Card, Header} from 'semantic-ui-react';

export default function App(props) {

return(
    <div style={{...props.style, padding:'10px'}}>
    <Card style={{height:'100%', width:'100%'}}>
        <Card.Content>
        <Header>Fortune Cookie</Header>
            Fortune: {props.cookie === null ? '' : props.cookie.fortune.message}
            <br/>
            Lotto: {props.cookie === null ? '' : props.cookie.lotto.numbers.map((num) => num + ', ')}
            <br/>
            Lesson: {props.cookie === null ? '' : props.cookie.lesson.translation}
        </Card.Content>
    </Card>
    </div>
)
}