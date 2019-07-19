export let musicLang = `musicLang {
  
  Init
    = Start

  Start
    = Instrument Statement*

  Instrument
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
    = "Play" SingleNote Timing

  SingleNote
    = "SingleNote" noteFreq Duration Velocity

  Repeat
    = "Repeat" SingleNote Interval StartTime Duration

  noteFreq
    = pitchOctave
    | number

  Duration
    = "for" tempoRelative

  Velocity
    = "velocity" number

  Timing
    = "at" tempoRelative

  Interval
    = "every" tempoRelative

  StartTime
    = "since" tempoRelative

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