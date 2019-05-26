import React from 'react';
import './App.css';
var Tone = require('tone');
var ohm = require('ohm-js');

let musicLang = `musicLang {
  triggerAttackRelease = "TriggerAttackRelease" " " ident " " ident

  ident = alnum+
}`

function App() {
  
  const synth = new Tone.MembraneSynth().toMaster();
  let gramma = ohm.grammar(musicLang);
  let input = 'TriggerAttackRelease C4 8n';
  let semnantics = gramma.createSemantics().addOperation('eval', {
    triggerAttackRelease: function(first, second, third, fourth, fiveth) {
      return synth.triggerAttackRelease(third.eval(), fiveth.eval())
    },
    ident: function(e) {
      console.log(this.sourceString)
      return this.sourceString
    }
  })

  let m = gramma.match(input);
  if(m.succeeded()) {
    console.log('matched')
  } else {
    console.log('did not match')
  }
  semnantics(m).eval()


  function playMusic() {
    //synth.triggerAttackRelease('C4', '8n')
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
