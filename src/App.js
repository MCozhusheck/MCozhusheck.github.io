import React from 'react';
import './App.css';
import musicLang from './parser/musicLang'

var Tone = require('tone');
var ohm = require('ohm-js');


function App() {
  const synth = new Tone.MembraneSynth().toMaster();
  let gramma = ohm.grammar(musicLang);
  let input = 'TriggerAttackRelease C4 4t';
  let semnantics = gramma.createSemantics().addOperation('eval', {
    triggerAttackRelease: function(first, second, third, fourth, fiveth) {
      return synth.triggerAttackRelease(third.eval(), fiveth.eval())
    },
    ident: function(e) {
      console.log(this.sourceString)
      return this.sourceString
    },
    tempoRelative: function(e) {
      return e.eval()
    },
    notation: function(number, part) {
      console.log(this.sourceString + " notation")
      return this.sourceString
    },
    number: function(_) {
      console.log(parseFloat(this.sourceString) + " number")
      return parseFloat(this.sourceString)
    },
    transportTime: function(_) {
      console.log(this.sourceString + " trans")
      return this.sourceString
    },
    frequency: function(_) {
      console.log(this.sourceString + " freq")
      return this.sourceString
    },
    tick: function(_) {
      console.log(this.sourceString + " tick")
      return this.sourceString
    }
  })

  let m = gramma.match(input);
  if(m.succeeded()) {
    console.log('matched')
  } else {
    console.log('did not match')
  }


  function playMusic() {
    semnantics(m).eval()
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
