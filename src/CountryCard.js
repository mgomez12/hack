import React, {useState, useEffect} from 'react';
import {Card, Image, Header} from 'semantic-ui-react';

export default function App(props) {

return(
    <div style={{...props.style, padding:'10px'}}>
    <Card style={{height:'100%', width:'100%'}}>
        <Card.Content>
        <div className="card-title">Nationality</div>
        <Header style={{height:"1%", margin:"15px"}}> Based on your name, we believe you are from:</Header>
        <Image src={`https://www.countryflags.io/${props.code.toLowerCase()}/flat/64.png`} />
        <Header size="large" style={{margin:"15px"}}>{props.countryName}</Header>
        </Card.Content>
    </Card>
    </div>
)
}