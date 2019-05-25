import React from 'react';
import './App.css';
var Tone = require('tone');
var ohm = require('ohm-js');
const file = require('./parser/musicLang.ohm');

function App() {

  let gramma = ohm.grammar('musicLang { triggerAttackRelease = "TriggerAttackRelease" " " alnum+ " " alnum+}');
  let input = 'TriggerAttackRelease C4 8n';
  let m = gramma.match(input);
  if(m.succeeded()) {
    console.log('matched')
  } else {
    console.log('did not match')
  }
  const synth = new Tone.MembraneSynth().toMaster();

  function playMusic() {
    synth.triggerAttackRelease('C4', '8n')
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
