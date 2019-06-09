import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { parse, match, nodes, id } from './parser/semantics'
var Tone = require('tone');
const placeholder = 'membrane\n' + 
'SingleNote C4 0.5 1\n' +
'SingleNote E4 0.5 2\n' +
'SingleNote G4 0.5 3\n' +
'SingleNote B4 0.5 4\n';

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

function ToggleButton() {

  function toggleMusic() {
    Tone.Transport.toggle()
  }

  return (
    <button onClick={toggleMusic}>
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

  function parseInput() {
    let m = match(input);
    if (m.succeeded()) {
      console.log('matched')
    } else {
      console.log('did not match')
    }

    if(ids !== -1){
      ids.forEach(id => Tone.Transport.clear(id))
    }

    parse(input)
    setIds(id)

    console.log(nodes)
  }

  return (
    <div className="App">
      <ParseButton parse={parseInput} />
      <ToggleButton />
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