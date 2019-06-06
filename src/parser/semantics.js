import musicLang from './musicLang'
var Tone = require('tone');
var ohm = require('ohm-js');

const synth = new Tone.MembraneSynth().toMaster();
let gramma = ohm.grammar(musicLang);
export var nodes

let semnantics = gramma.createSemantics().addOperation('eval', {
    Start: function(e) {
        nodes = Object.assign(e.children)
        return e.eval()
    },
    Statement: function(e) {
        e.eval()
    },
    exeSingleNote: function(singleNote, _, start) {
        return Tone.Transport.schedule(singleNote.eval(), start.sourceString)
    },
    singleNote: function (_, ls, noteFreq, ms, duration) {
        const trigger = (time) => synth.triggerAttackRelease(noteFreq.eval(), duration.eval(), time);
        return trigger
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
    Repeat: function(_, interval, start, duration, lcb, statement, rcb) {
        return Tone.Transport.scheduleRepeat(statement.eval(), interval, start, duration)
    }
})

export let parse = function parse(input) {
    let result = match(input)
    return semnantics(result).eval()
}

export let match = function(input){
    return gramma.match(input)
}

export default { parse, match, nodes}