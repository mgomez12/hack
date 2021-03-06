import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Header, SearchCategory } from 'semantic-ui-react';
import { CSSTransition } from 'react-transition-group';
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

  useEffect(() => {
    document.body.classList.add('no-scroll');
  })

  const update = (event, data) => {
    setName(data.value)
  }

  const enableScroll = () => {
    document.body.classList.remove("no-scroll")
    document.body.classList.add('scroll');
  }

  const disableScroll = () => {
    document.body.classList.add('no-scroll');
    document.body.classList.remove("scroll")
  }
  const reset = () => {
    setReady(false);
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
    setError(false);
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

    const promise3 = fetch("https://fortunecookieapi.herokuapp.com/v1/cookie")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setCookie(data[0]);
      });

      const promise2 = fetch("https://xkcd.now.sh/?comic=latest").then((data) => data.json())
      .then(data => {
        console.log(data.num);
        console.log(hashString(name));
        const id = hashString(name) % data.num;
        fetch(`https://xkcd.now.sh/?comic=${id}`).then((data) => data.json())
        .then(data => {
          setComic(data);
        })
      });
    Promise.all([promise1, promise2, promise3]).then(() => setReady(true), () => setError(true));
  }
  return (
    <div className="App">
      <CSSTransition
        unmountOnExit
        in={!ready}
        classNames="title"
        onEnter={disableScroll}
        timeout={2000}>
        <div className="centered">
          <div className="title">
            Identifi
            </div>
          <div class="ui action input">
            <Input placeholder="Enter your name..." onChange={update}
              style={{
                fontFamily: "Segoe UI",
                opacity: 0.8,
              }} />
            <button class="ui button" disabled={name === ""} onClick={getData}
              style={{
                fontFamily: "Segoe UI",
                opacity: 0.8,
              }} >
              Submit!
          </button>
          </div>
          <br/>
          {error? "Sorry, we couldn't find that name!" : ""}
        </div>
      </CSSTransition>
      <CSSTransition
        in={ready}
        classNames="result"
        timeout={2000}
        onEntered={enableScroll}
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
              <Header style={{fontSize:"30px"}}>Identifi</Header>
            </div>
            <div style={{flex:1}}></div>
            </div>
          
          <div style={{display:"flex", width:'100%', flex:"1 1 auto"}}>
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
