import React, {useState, useEffect} from 'react';
import {Card, Image} from 'semantic-ui-react';

export default function App(props) {

return(
    <Card>
        <Card.Content>
        <Image src={`https://www.countryflags.io/${props.code.toLowerCase()}/shiny/64.png`} />
        {props.countryName}
        </Card.Content>
    </Card>
)
}