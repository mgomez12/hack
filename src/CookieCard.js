import React, {useState, useEffect} from 'react';
import {Card, Header} from 'semantic-ui-react';

export default function App(props) {

    const numsToString = () => {
        let s = '';
        props.cookie.lotto.numbers.map((num) => s = s.concat(num.toString() + ', '));
        console.log(s);
        return s.substring(0,s.length-2);
    }
return(
    <div style={{...props.style, padding:'10px'}}>
    <Card style={{height:'100%', width:'100%'}}>
        <Card.Content>
        <div className="card-title">Fortune Cookie</div>
            <Header size="large" style={{float:'left', margin:'20px'}}>Your Fortune:  {props.cookie === null ? '' : props.cookie.fortune.message}
            </Header>
            <br/>
            <Header size="large" style={{float:'left', margin:'20px'}}>Your Lotto #'s:  {props.cookie === null ? '' : numsToString()}
            </Header>
            </Card.Content>
    </Card>
    </div>
)
}