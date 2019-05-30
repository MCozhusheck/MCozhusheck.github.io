import musicLang from './musicLang'
var Tone = require('tone');
var ohm = require('ohm-js');

const synth = new Tone.MembraneSynth().toMaster();
let gramma = ohm.grammar(musicLang);

let semnantics = gramma.createSemantics().addOperation('eval', {
    triggerAttackRelease: function (_, ls, noteFreq, ms, tempoRelative, rs, timing) {
        return synth.triggerAttackRelease(noteFreq.eval(), tempoRelative.eval(), timing.sourceString)
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
})

export let parse = function parse(input) {
    let result = match(input)
    return semnantics(result).eval()
}

export let match = function(input){
    return gramma.match(input)
}

export default { parse, match}