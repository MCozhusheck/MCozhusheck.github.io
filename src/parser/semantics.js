import musicLang from './musicLang'
import Tone from 'tone';
import ohm  from 'ohm-js';
import { getInstrument } from './instruments'

let synth = null
let gramma = ohm.grammar(musicLang);
let onLoad = null;
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
        let tmpId = Tone.Transport.schedule(event.eval(), start.eval())
        id.push(tmpId)
        return tmpId
    },
    SingleNote: function (_, noteFreq, duration, velocity) {
        const trigger = (time) => synth.triggerAttackRelease(noteFreq.eval(), duration.eval(), time, velocity.eval());
        return trigger
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
    Repeat: function(_, callback, interval, start, duration) {
        let tmpId = Tone.Transport.scheduleRepeat(callback.eval(), interval.eval(), start.eval(), duration.eval())
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