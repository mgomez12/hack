import React, { useState, useEffect } from 'react';
import { Card, Image, Header } from 'semantic-ui-react';

export default function App(props) {

return(
    <div style={{...props.style, padding:'10px'}}>
    <Card style={{height:'100%', width:'100%'}} backgroundcolor="grey">
        <Card.Content>
            <div>
                <div className="card-title">
                    XKCD #{props.comic.num}: {props.comic.title}
                </div>
                The hash of your name resulted in this comic's ID!
            </div>
            <div className="centered">
            <Image style={{padding:'20px'}} src={`${props.comic.img}`} />
            <br/>
            {props.comic.alt}
            </div>
        </Card.Content>
        <Card.Content extra>
                <a>Published {props.comic.month}/{props.comic.day}/{props.comic.year}</a>
            </Card.Content>
    </Card>
    </div>
)
}