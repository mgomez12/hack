import React, {useState, useEffect} from 'react';
import {Input, Button, Image, Header} from 'semantic-ui-react';
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
    return Math.abs(hash);
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
      }
    })

    const promise2 = fetch("https://xkcd.now.sh/?comic=latest").then((data) => data.json())
    .then(data => {
      console.log(data.num);
      console.log(hashString(name));
      const id = hashString(name) % data.num;
      fetch(`https://xkcd.now.sh/?comic=${id}`).then((data) => data.json())
      .then(data => {
        setComicURL(data);
      })
    });
    Promise.all([promise1, promise2]).then(() => setReady(true))
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
      <Header>
        XKCD #{comicURL.num}
      </Header>
      <Image src={`${comicURL.img}`} />
      {comicURL.alt}
      </React.Fragment>
        }
      </div>
    );
}

export default App;
