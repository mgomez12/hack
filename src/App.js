import React, {useState, useEffect} from 'react';
import {Input, Button, Image} from 'semantic-ui-react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const update = (event, data) => {
    setName(data.value)
  }


  const getData = () => {
    fetch("https://api.nationalize.io?name=" + name).then((data) => data.json())
    .then(data => {
      console.log(data);
      if (data.country.length === 0) {
        setError(true);
      }
      else {
        setCode(data.country[0].country_id)
        setReady(true);
      }
    })
  }
    return (
      <div className="App">
        {!ready ? 
        <div className="centered">
        <div className="title">
          ABBABHABA.io
        </div>
        <Input placeholder="Enter your name..." onChange={update}/>
        <br/>
        <Button style={{margin:'10px'}} basic color='violet' disabled={name===""} onClick={getData}>
          Submit!
          </Button>
        {error ? <div>You have a fucking stupid name</div> : ''}
        </div>
      :
      <Image src={`https://www.countryflags.io/${code.toLowerCase()}/shiny/64.png`} />
        }
      </div>
    );
}

export default App;
