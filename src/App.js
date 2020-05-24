import React, {useState, useEffect} from 'react';
import {Input, Button, Image, Header} from 'semantic-ui-react';
import {CSSTransition} from 'react-transition-group';
import CountryCard from './CountryCard';
import ComicCard from './ComicCard';
import CookieCard from './CookieCard';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [comic, setComic] = useState("");
  const [countryName, setCountryName] = useState("")
  const [cookie, setCookie] = useState(null);

  const update = (event, data) => {
    setName(data.value)
  }

  const reset = () => {
    // setName("");
    setReady(false);
    // setCode("");
    // setError(false);
    // setComic("");
    // setCountryName("");
    // setCookie(null);
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
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
          return Promise.reject();
        }
        else {
          setCode(data.country[0].country_id)
          return fetch(`https://restcountries.eu/rest/v2/alpha/${data.country[0].country_id}`)
            .then(res => res.json())
            .then(data => setCountryName(data.name));

        }
      })

    const promise3 = fetch("http://fortunecookieapi.herokuapp.com/v1/cookie")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setCookie(data[0]);
      });

    const promise2 = fetch("https://xkcd.now.sh/?comic=latest").then((data) => data.json())
      .then(data => {
        setComic(data);
      });
    Promise.all([promise1, promise2, promise3]).then(() => setReady(true), () => setError(true));
  }
  return (
    <div className="App">
      <CSSTransition
        unmountOnExit
        in={!ready}
        classNames="title"
        timeout={2000}>
        <div className="centered">
          <div className="title">
            ABBABHABA.io
            </div>
          <div class="ui action input">
            <Input opacity=".6" placeholder="Enter your name..." onChange={update} />
            <button opacity=".6" class="ui button" disabled={name === ""} onClick={getData} >Submit!</button>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={ready}
        classNames="result"
        timeout={2000}
        unmountOnExit>
        <div className="absolute-pos">
          <div style={{display:"flex", flexDirection:"column", height:"100%", width:"100%", flex:"0 1 auto"}}>
            <div style={{display:"flex", width:'100%'}}>
              <div style={{flex:1}}>
                <div style={{float:'left', padding:'10px'}}>
                <Button onClick={reset}> Start Over</Button>
                </div>
              </div>
            <div style={{textAlign:"center", margin:'auto', flex:1}}>
              <Header>Name.space</Header>
            </div>
            <div style={{flex:1}}></div>
            </div>
          
          <div style={{display:"flex", width:'100%', height:'100%', flex:"1 1 auto"}}>
            <div style={{flex:1, height:'100%'}}>
              <CountryCard style={{height:'50%'}} code={code} countryName={countryName} />
              <CookieCard style={{height:'50%'}} cookie={cookie} />
            </div>
            <ComicCard style={{flex:1}} comic={comic} />
            
          </div>
          </div>
          </div>
        </CSSTransition>
      </div>
    );
}

export default App;
