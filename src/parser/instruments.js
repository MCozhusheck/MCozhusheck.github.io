import Tone from 'tone';
import { instrumentsSource } from './instrumentsSource';
const baseUrl = './samples/';


let instrumentsList = ['bass-electric','bassoon','cello','clarinet','contrabass','flute','french-horn','guitar-acoustic','guitar-electric','guitar-nylon', 'harmonium','harp','organ','piano','saxophone','trombone','trumpet','tuba','violin','xylophone'];
let instruments = new Map()
instrumentsList.forEach( function (instrument) {
    instruments.set(instrument, undefined)
})

export let getInstrument = function(instrument, onLoad) {
    if(instruments.get(instrument)) {
        onLoad()
        return instruments.get(instrument)
    }
    let instrumentSample = new Tone.Sampler(instrumentsSource[instrument], onLoad, baseUrl.concat(instrument+'/'))
    instruments.set(instrument, instrumentSample)
    return instrumentSample
}