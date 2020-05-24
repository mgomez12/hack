import React, {useState, useEffect} from 'react';
import {Card, Image} from 'semantic-ui-react';

export default function App(props) {

return(
    <div style={{...props.style, padding:'10px'}}>
    <Card style={{height:'100%', width:'100%'}}>
        <Card.Content>
        <Image src={`https://www.countryflags.io/${props.code.toLowerCase()}/flat/64.png`} />
        {props.countryName}
        </Card.Content>
    </Card>
    </div>
)
}