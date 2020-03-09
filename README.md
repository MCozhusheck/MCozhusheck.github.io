# MusicLang
Online interpreter using ohm.js that produce melody with Tone.js

Clone and run`npm install && npm run start` or visit [my github page](https://mcozhusheck.github.io/MusicLang).

# Syntax

## Header

Keywords are seperated by white spaces.
First line must contain 'use' followed by avaible instrument including: 
*bass-electric*
*bassoon*
*cello*
*clarinet*
*contrabass*
*flute*
*french-horn*
*guitar-acoustic*
*guitar-electric*
*guitar-nylon*
*harmonium*
*harp*
*organ*
*piano*
*saxophone*
*trombone*
*trumpet*
*tuba*
*violin*
*xylophone"*

Optionaly you can set BPM under instrument declaration by typing `set bpm to` followed by number.

## Note encoding

Notes can be defined by their "pitch-octave" like C4 for middle C or C#4 Db5 and so on. Alternative is to declare notes as number which corresponds to their frequency (like 440 for middle C).

## Time encoding

Specifies time for given event. It consist of `at` followed by one of avaible notation including:
- Number - A number will be evaluated as the time (in seconds)
 *1.2 = 1.2 seconds
 *3 = 3 seconds
- Notation - Describes time in BPM and time signature relative values
 *"4n" = quarter note
 *"8t" = eighth note triplet
 *"2m" = two measures
 *"8n." = dotted-eighth note
- Transport Time - Tempo and time signature relative time in the form BARS:QUARTERS:SIXTEENTHS
 *"32:0:0" = start of the 32nd measure
 *"4:3:2" = 4 bars + 3 quarter notes + 2 sixteenth notes
 *"1:2" = 1 bar + 2 quarter notes (sixteenth notes can be omitted)
- Frequency - Seconds can also be described in Hz
 *"1hz" = 1 second
 *"5hz" = 0.2 seconds
- Ticks - A time relative to the Transport's PPQ (Pulse Per Quarter). The number before the 'i' needs to be an integer
 *"1i" = 1 tick
 *"192i" = 1 quarter note at 192 PPQ


## Event

Defines action to take. The avaible evetns are:
- SingleNote - defines single note. Consist of keyword `SingleNote` followed by note (for example C4), duration (which contains keyword `for` followed by duration in one of time signature) and velocity which is keyword `velocity` followed by float number in range of 0 - 1 which describes % of volume.
 * `SingleNote C4 for 0.5 velocity 1` - Middle C for duration of half second with full volume
- ManyNotes - defines multiple notes ranging from 2 to 4. It is similar to previous but it allows to set from 2 to 4 different notes at the same time.
 * `ManyNotes D4 C4 for 0.5 velocity 0.7` - Middle C and D4 for half second with 70% of volume.

## Declaring Variable 

Variables can be declared by using keyword `let` followed by any given identified which doesn't consist white spaces followed by keyword `as` and event declaration of body declaration.
*`let someVariable as SingleNote C4 for 0.5 velocity 0.3` - declares `someVariable` as middle C
Body declaration consist many events. It starts with keyword `Body` followed by any number of events and closed with keyword `end`.
```
let someVariable as
begin
    SingleNote E4 for 0.5 velocity 0.5 at 2
    SingleNote G4 for 0.5 velocity 0.7 at 3
end
```


## Statement

Statement decides what to do with given event. Event can be defined inline or it can be defined variable.
There avaible 3 statements: 
- Play - plays event once at given time
 *`Play SingleNote E4 for 0.5 velocity 0.5 at 1` - Plays E4 at 1 second.
- Repeat - repeats event in specified time frame
 *`Repeat someVariable every 5 since 1 for 11` - Repeats variable every 5 seconds since second 1 to second 11


