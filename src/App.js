import React, {useState, useEffect} from 'react';
import {Input, Button, Image, Header} from 'semantic-ui-react';
import {CSSTransition} from 'react-transition-group';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [comicURL, setComicURL] = useState("");
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
    // setComicURL("");
    // setCountryName("");
    // setCookie(null);
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
      console.log(data.num);
      console.log(hashString(name));
      const id = hashString(name) % data.num;
      fetch(`https://xkcd.now.sh/?comic=${id}`).then((data) => data.json())
      .then(data => {
        setComicURL(data);
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
          timeout={2000}>
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
        </CSSTransition>
        <CSSTransition
          in={ready}
          classNames="result"
          timeout={2000}
          unmountOnExit>
            <div className="absolute-pos">
          <Button onClick={reset}> Start Over</Button>
          
            <Image src={`https://www.countryflags.io/${code.toLowerCase()}/shiny/64.png`} />
            {countryName}
            <Header>
              XKCD #{comicURL.num}
            </Header>
            <Image src={`${comicURL.img}`} />
            {comicURL.alt}
            <Header>Fortune Cookie</Header>
            Fortune: {cookie === null ? '' : cookie.fortune.message}
            <br/>
            Lotto: {cookie === null ? '' : cookie.lotto.numbers.map((num) => num + ', ')}
            <br/>
            Lesson: {cookie === null ? '' : cookie.lesson.translation}
          </div>
        </CSSTransition>
      </div>
    );
}

export default App;
