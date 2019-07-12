import Tone from 'tone';
import { instrumentsSource } from './instrumentsSource';
const baseUrl = '/samples/';


let instrumentsList = ['bass-electric','bassoon','cello','clarinet','contrabass','flute','french-horn','guitar-acoustic','guitar-electric','guitar-nylon', 'harmonium','harp','organ','piano','saxophone','trombone','trumpet','tuba','violin','xylophone'];

let doneLoading = function(){
    console.log('loaded')
}

export let getInstrument = function(instrument) {
    console.log(baseUrl.concat(instrument+'/'))
    let instrumentSample = new Tone.Sampler(instrumentsSource[instrument], doneLoading(), baseUrl.concat(instrument+'/'))
    return instrumentSample
}

