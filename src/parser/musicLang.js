export let musicLang = `musicLang {
  Start
    = Statement*

  Statement
    = exeSingleNote
    | Repeat

  exeSingleNote
    = singleNote " "+ tempoRelative?

  singleNote
    = "SingleNote" " "+ noteFreq " "+ tempoRelative

  Repeat
    = "repeat" tempoRelative  tempoRelative? tempoRelative? "{" singleNote "}"

  noteFreq
    = pitchOctave
    | number

  pitchOctave
    = "A".."G" digit     -- octave
    | "A".."G" "#" digit -- sharpOctave
    | "A".."G" "b" digit -- flatOctave

  tempoRelative
    = notation
    | frequency
    | tick
    | transportTime
    | nowRelative
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

  nowRelative
    = "+" tempoRelative
    
}`

export { musicLang as default}