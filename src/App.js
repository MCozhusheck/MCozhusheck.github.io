import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { parse, match, nodes, id } from './parser/semantics';
import Tone  from 'tone';

const parsingSucceeded = "Parsing succeeded";
const parsingFailed = "Parsing Failed";

const placeholder = 'violin\n' + 
'let aaa as SingleNote E4 for 0.5 velocity 0.5\n' +
'Repeat aaa every 1 since 0 for 10';


function Timer() {

  const [localTime, setLocalTime] = useState(Tone.Transport.seconds.toFixed(2))

  useInterval( () => {
    setLocalTime(Tone.Transport.seconds.toFixed(2))
  }, 10)

  return (
    <div>
      <p>time in seconds: {localTime}</p>
    </div>
  );
}

function ToggleButton({disabled}) {

  function toggleMusic() {
    Tone.Transport.toggle()
  }

  return (
    <button onClick={toggleMusic} disabled={disabled}>
        toggle music
      </button>
  )
}

function ParseButton({parse}) {
  
  return (
    <button onClick={parse}>
        parse
    </button>
  )
}

function InputText({input, setInput}) {

  return (
    <div>
      <form>
        <textarea style={{height: 400, width: 600}} value={input} onChange={ e => setInput(e.target.value)}/>
      </form>
    </div>
  )
}

function App() {

  const [input, setInput] = useState(placeholder)
  const [ids, setIds] = useState([-1])
  const [feedback, setFeedback] = useState("Waiting for input")
  const [loaded, setLoaded] = useState(false)

  let assetsLoaded = function() {
    setLoaded(true)
    setFeedback("Audio assets loaded.")
  }

  Tone.Buffer.on('error', function() {
    setFeedback("Failed to to load audio assets.")
    setLoaded(false)
  })

  function parseInput() {
    setLoaded(false)
    let m = match(input);
    if (m.succeeded()) {
      console.log('matched input text')
      setFeedback(parsingSucceeded)
    } else {
      console.log('did not match input text')
      setFeedback(parsingFailed)
      return
    }

    setFeedback(parsingSucceeded + ', loading audio assets.')

    if(ids !== -1){
      ids.forEach(id => Tone.Transport.clear(id))
    }
  

    parse(input, assetsLoaded)
    setIds(id)
  }

  return (
    <div className="App">
      <ParseButton parse={parseInput} />
      <ToggleButton disabled={!loaded} />
      <p>{feedback}</p>
      <InputText input={input} setInput={setInput} />
      <Timer />
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default App;