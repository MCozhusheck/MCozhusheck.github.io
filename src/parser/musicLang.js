export let musicLang = `musicLang {
  
  Init
    = Start

  Start
    = Instrument Statement*

  Instrument
    = InstrumentType number

  InstrumentType
    = "bass-electric"
    | "bassoon"
    | "cello"
    | "clarinet"
    | "contrabass"
    | "flute"
    | "french-horn"
    | "guitar-acoustic"
    | "guitar-electric"
    | "guitar-nylon"
    | "harmonium"
    | "harp"
    | "organ"
    | "piano"
    | "saxophone"
    | "trombone"
    | "trumpet"
    | "tuba"
    | "violin"
    | "xylophone"
  
  Statement
    = ExeSingleNote
    | Repeat

  ExeSingleNote
    = SingleNote tempoRelative?

  SingleNote
    = "SingleNote" noteFreq tempoRelative number

  Repeat
    = "Repeat" SingleNote tempoRelative tempoRelative? tempoRelative?

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