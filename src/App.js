import React, { useState } from 'react';
import './App.css';
import { parse, match, nodes } from './parser/semantics'
var Tone = require('tone');

function App() {

  let placeholder = 'TriggerAttackRelease C4 0.5 1\n' +
  'TriggerAttackRelease E4 0.5 2\n' +
  'TriggerAttackRelease G4 0.5 3\n' +
  'TriggerAttackRelease B4 0.5 4\n';
  const [contextTime, setContextTime] = useState(Tone.context.currentTime.toFixed(2))
  const [localTime, setLocalTime] = useState(Tone.Transport.seconds.toFixed(2))
  const [input, setInput] = useState(placeholder)

  function parseInput() {
    let m = match(input);
    if (m.succeeded()) {
      console.log('matched')
    } else {
      console.log('did not match')
    }
    parse(input)
    console.log(nodes)
  }

  function toggleMusic() {
    Tone.Transport.toggle()
  }

  return (
    <div className="App">
      <button onClick={parseInput}>
        parse
      </button>
      <button onClick={toggleMusic}>
        toggle music
      </button>
      <form>
        <textarea style={{height: 200, width: 600}} value={input} onChange={ e => setInput(e.target.value)}/>
      </form>
      <p>local seconds: {localTime}</p>
      <p>context time: {contextTime}</p>
    </div>
  );
}

export default App;