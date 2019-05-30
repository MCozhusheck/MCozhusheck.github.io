import React from 'react';
import './App.css';
import {parse, match} from './parser/semantics'

function App() {
  let input = `TriggerAttackRelease C4 0.5 1
               TriggerAttackRelease E4 0.5 2
               TriggerAttackRelease G4 0.5 3
               TriggerAttackRelease B4 0.5 4`;

  let m = match(input);
  if(m.succeeded()) {
    console.log('matched')
  } else {
    console.log('did not match')
  }


  function playMusic() {
    parse(input)
  }
  
  return (
    <div className="App">
      <button onClick={playMusic}>
        play music
      </button>
    </div>
  );
}

export default App;
