import React, {useState, useEffect} from 'react';
import {Card, Image, Header} from 'semantic-ui-react';

export default function App(props) {

return(
    <Card>
        <Card.Content>
        <Header>
              XKCD #{props.comic.num}
            </Header>
            <Image src={`${props.comic.img}`} />
            {props.comic.alt}
        </Card.Content>
    </Card>
)
}