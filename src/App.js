import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { parse, match, nodes, id } from './parser/semantics';
import Tone  from 'tone';
import {getInstrument} from './parser/instruments'

const parsingSucceeded = "Parsing succeeded";
const parsingFailed = "Parsing Failed";

const placeholder = 'violin\n' + 
'Repeat SingleNote C4 for 0.5 velocity 0.3 every 5 since 1 for 10\n' +
'Play SingleNote E4 for 0.5 velocity 0.5 at 2\n' +
'Play SingleNote G4 for 0.5 velocity 0.7 at 3\n' +
'Play SingleNote B4 for 0.5 velocity 1 at 4\n' +
'Play ManyNotes D4 C4 for 0.5 velocity 0.7 at 5';


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
  Tone.Buffer.on('load', assetsLoaded)

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