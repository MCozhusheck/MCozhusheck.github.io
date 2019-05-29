export let musicLang = `musicLang {
  triggerAttackRelease = "TriggerAttackRelease" " " ident " " tempoRelative

  ident
    = alnum+

  tempoRelative
    = notation
    | frequency
    | tick
    | transportTime
    | number

  notation
    = "1".."8" "n"
    | "1".."8" "t" 
    | "1".."8" "m" 

  number
    = digit* "." digit+  -- fract
    | digit+             -- whole

  transportTime
    = digit+ ":" digit+ ":" digit+ -- trans

  frequency
    = digit* "hz" -- freq

  tick
    = digit* "i" -- tick
    
}`

export { musicLang as default}