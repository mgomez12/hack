import React, {useState, useEffect} from 'react';
import {Input, Button, Image} from 'semantic-ui-react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [comicURL, setComicURL] = useState("");

  const update = (event, data) => {
    setName(data.value)
  }


  function hashString(str){
    let hash = 0;
    for(let i = 0; i < str.length; i++){
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash;
    }
  }

  const getData = () => {
    const promise1 = fetch("https://api.nationalize.io?name=" + name).then((data) => data.json())
    .then(data => {
      console.log(data);
      if (data.country.length == 0) {
        setError(true);
      }
      else {
        setCode(data.country[0].country_id)
        //setReady(true);
      }
    })

    const headers = {"Access-Control-Allow-Origin" : "*"}

    const promise2 = fetch("https://xkcd.com/info.0.json", {headers : headers}).then((data) => data.json())
    .then(data => {
      const id = hashString(name) % data.num;
      fetch(`https://xkcd.com/${id}/info.0.json`, {headers : headers}).then((data) => data.json())
      .then(data => {
        setComicURL(data);
      })
    });
    Promise.all([promise1, promise2]).then(() => setReady)
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
      <React.Fragment>
      <Image src={`https://www.countryflags.io/${code.toLowerCase()}/shiny/64.png`} />
      <Image src={`${comicURL}`} />
      </React.Fragment>
        }
      </div>
    );
}

export default App;
