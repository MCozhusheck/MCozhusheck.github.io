import React from 'react';
import './App.css';
var Tone = require('tone');


function App() {

  var jakeSynth = new Tone.Synth({
    oscillator : {
      type : 'fmsquare',
          modulationType : 'sawtooth',
          modulationIndex : 3,
          harmonicity: 3.4
    },
    envelope : {
      attack : 0.001,
          decay : 0.1,
          sustain: 0.1,
          release: 0.1
    }
  }).toMaster() 

  function playMusic() {
    jakeSynth.triggerAttackRelease('B2', '8n')
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
