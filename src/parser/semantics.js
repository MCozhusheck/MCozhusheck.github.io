import musicLang from './musicLang'
import Tone from 'tone';
import ohm  from 'ohm-js';
import { getInstrument } from './instruments'

let synth = null
let gramma = ohm.grammar(musicLang);
let onLoad = null;
let variables = new Map();
export let id
export let nodes

let semnantics = gramma.createSemantics().addOperation('eval', {
    Init: function(start) {
        nodes = Object.assign(start)
        id = []
        start.eval()
    },
    Start: function(toneType, statements) {
        toneType.eval()
        statements.eval()
    },
    Instrument(oscillator) {
        synth = getInstrument(oscillator.sourceString, onLoad).toMaster()
    },
    Statement: function(e) {
        e.eval()
    },
    Event: function(event) {
        return event.eval()
    },
    Play: function(_, event, start) {
        let tmpId
        if(typeof event.eval() === 'function') {
            tmpId = Tone.Transport.schedule(event.eval(), start.eval())
        } else {
            tmpId = Tone.Transport.schedule(variables.get(event.eval()), start.eval())
        }
        id.push(tmpId)
        return tmpId
    },
    SingleNote: function (_, noteFreq, duration, velocity) {
        const trigger = (time) => synth.triggerAttackRelease(noteFreq.eval(), duration.eval(), time, velocity.eval());
        return trigger
    },
    ManyNotes2: function (_,n1, n2, duration, velocity) {
        let noteArray = [n1.sourceString, n2.sourceString];
        const trigger = (time) => synth.triggerAttackRelease(noteArray, duration.eval(), time, velocity.eval())
        return trigger
    },
    ManyNotes3: function (_,n1, n2, n3, duration, velocity) {
        let noteArray = [n1.sourceString, n2.sourceString, n3.sourceString];
        const trigger = (time) => synth.triggerAttackRelease(noteArray, duration.eval(), time, velocity.eval())
        return trigger
    },
    ManyNotes4: function (_,n1, n2, n3, n4, duration, velocity) {
        let noteArray = [n1.sourceString, n2.sourceString, n3.sourceString, n4.sourceString];
        const trigger = (time) => synth.triggerAttackRelease(noteArray, duration.eval(), time, velocity.eval())
        return trigger
    },
    Assignment: function (_, ident, __, event) {
        variables.set(ident.eval(), event.eval())
    },
    Duration: function (_, dur) {
        return dur.eval()
    },
    Velocity: function(_, vel){
        return vel.sourceString
    },
    Timing: function (_, start) {
        return start.eval()
    },
    Interval: function(_, inter) {
        return inter.eval()
    },
    StartTime: function(_, start) {
        return start.eval()
    },
    noteFreq: function (e) {
        return e.eval()
    },
    pitchOctave: function (_) {
        return this.sourceString
    },
    tempoRelative: function (e) {
        return e.eval()
    },
    notation: function (number, part) {
        return this.sourceString
    },
    number: function (_) {
        return parseFloat(this.sourceString)
    },
    transportTime: function (_) {
        return this.sourceString
    },
    frequency: function (_) {
        return this.sourceString
    },
    tick: function (_) {
        return this.sourceString
    },
    nowRelative: function(plus, tempoRel) {
        return plus.sourceString + tempoRel.eval()
    },
    ident: function(i) {
        return i.sourceString
    },
    Repeat: function(_, event, interval, start, duration) {
        let tmpId
        if(typeof event === 'function') {
            tmpId = Tone.Transport.scheduleRepeat(event.eval(), interval.eval(), start.eval(), duration.eval())
        } else{
            tmpId = Tone.Transport.scheduleRepeat(variables.get(event.eval()), interval.eval(), start.eval(), duration.eval())
        }
        id.push(tmpId)
        return tmpId
    }
})

export let parse = function parse(input, assetsLoaded) {
    let result = match(input)
    onLoad = assetsLoaded
    return semnantics(result).eval()
}

export let match = function(input){
    return gramma.match(input)
}

export default { parse, match, nodes, id }