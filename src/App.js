import React, { useState } from 'react';
import './App.css';
import { parse, match } from './parser/semantics'
var Tone = require('tone');

function App() {

  let placeholder = 'TriggerAttackRelease C4 0.5 1\n' +
  'TriggerAttackRelease E4 0.5 2\n' +
  'TriggerAttackRelease G4 0.5 3\n' +
  'TriggerAttackRelease B4 0.5 4\n';
  const [input, setInput] = useState(placeholder)

  function toggleMusic() {
    let m = match(input);
    if (m.succeeded()) {
      console.log('matched')
    } else {
      console.log('did not match')
    }
    parse(input)
  }

  return (
    <div className="App">
      <button onClick={toggleMusic}>
        toggle music
      </button>
      <form>
        <textarea style={{height: 200, width: 600}} value={input} onChange={ e => setInput(e.target.value)}/>
      </form>
    </div>
  );
}

export default App;