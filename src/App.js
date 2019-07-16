import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { parse, match, nodes, id } from './parser/semantics';
import Tone  from 'tone';

const parsingSucceeded = "Parsing succeeded";
const parsingFailed = "Parsing Failed";

const placeholder = 'violin\n' + 
'SingleNote C4 0.5 0.3 1\n' +
'SingleNote E4 0.5 0.5 2\n' +
'SingleNote G4 0.5 0.7 3\n' +
'SingleNote B4 0.5 1 4\n';


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
  const [matched, setMatched] = useState("")
  const [loaded, setLoaded] = useState(false)

  Tone.Buffer.on('load', function() {
    setLoaded(true)
  })

  Tone.Buffer.on('error', function() {
    console.log('test error')
  })

  function parseInput() {
    setLoaded(false)
    let m = match(input);
    if (m.succeeded()) {
      console.log('matched input text')
      setMatched(parsingSucceeded)
    } else {
      console.log('did not match input text')
      setMatched(parsingFailed)
      return
    }

    if(ids !== -1){
      ids.forEach(id => Tone.Transport.clear(id))
    }
  

    parse(input)
    setIds(id)
  }

  return (
    <div className="App">
      <ParseButton parse={parseInput} />
      <ToggleButton disabled={!loaded} />
      <p>{matched}</p>
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