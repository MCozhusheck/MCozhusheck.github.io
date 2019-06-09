export let musicLang = `musicLang {
  
  Init
    = Start

  Start
    = ToneType Statement*

  ToneType 
    = MembraneSynth
    | Instrument

  Instrument
    = Oscillator Envelope

  Oscillator 
    = type

  type
    = "fmsquare"
    | "triangle8"

  Envelope
    = number number number number

  MembraneSynth
    = "membrane"
  
  Statement
    = ExeSingleNote
    | Repeat

  ExeSingleNote
    = SingleNote tempoRelative?

  SingleNote
    = "SingleNote" noteFreq tempoRelative

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