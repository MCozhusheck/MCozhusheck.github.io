export let musicLang = `musicLang {
  Start
    = triggerAttackRelease*

  triggerAttackRelease
    = "TriggerAttackRelease" " " noteFreq " " tempoRelative " "* number*

  noteFreq
    = pitchOctave
    | number

  pitchOctave
    = "A".."G" digit     -- octave
    | "A".."G" "#" digit -- sharpOctave

  tempoRelative
    = notation
    | frequency
    | tick
    | transportTime
    | number

  notation
    = digit+ "n"
    | digit+ "t" 
    | digit+ "m" 

  number
    = digit* "." digit+  -- fract
    | digit+             -- whole

  transportTime
    = digit+ ":" digit+ ":" digit+ -- trans

  frequency
    = digit* "hz" -- freq

  tick
    = digit* "i"  -- tick
    
}`

export { musicLang as default}