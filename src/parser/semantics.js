import musicLang from './musicLang'
var Tone = require('tone');
var ohm = require('ohm-js');

let synth = null
let gramma = ohm.grammar(musicLang);
export var id
export var nodes

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
    ToneType: function(e) {
        e.eval()
    },
    MembraneSynth: function(e) {
        synth = new Tone.MembraneSynth().toMaster();
    },
    Instrument(oscillator, envelope) {
        synth = new Tone.Synth(oscillator.eval(),envelope.eval()).toMaster()
    },
    Oscillator: function(type) {
        let oscillator = {
            oscillator: {
                type: type.eval()
            }
        }
        return oscillator
    },
    type: function(_) {
        return this.sourceString
    },
    PolySynth: function(_, num) {
        synth = new Tone.PolySynth(num.eval(), Tone.Synth).toMaster()
    },
    term: function(e) {
        
    },
    Envelope(attack, decay, sustain, release){
        let envelope = {
            envelope: {
                attack: attack.eval(),
                decay: decay.eval(),
                sustain: sustain.eval(),
                release: release.eval()
            }
        }
        return envelope
    },
    Statement: function(e) {
        e.eval()
    },
    ExeSingleNote: function(singleNote, start) {
        let tmpId = Tone.Transport.schedule(singleNote.eval(), start.sourceString)
        id.push(tmpId)
        return tmpId
    },
    SingleNote: function (_, noteFreq, duration) {
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
    Repeat: function(_, callback, interval, start, duration) {
        let tmpId = Tone.Transport.scheduleRepeat(callback.eval(), interval.eval(), start.eval(), duration.eval())
        id.push(tmpId)
        return tmpId
    }
})

export let parse = function parse(input) {
    let result = match(input)
    return semnantics(result).eval()
}

export let match = function(input){
    return gramma.match(input)
}

export default { parse, match, nodes, id}