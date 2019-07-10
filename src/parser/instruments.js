import Tone from 'tone';
import { instrumentsSource } from './instrumentsSource';
const path = '../../../instruments/samples';


let instrumentsList = ['bass-electric','bassoon','cello','clarinet','contrabass','flute','french-horn','guitar-acoustic','guitar-electric','guitar-nylon', 'harmonium','harp','organ','piano','saxophone','trombone','trumpet','tuba','violin','xylophone'];

export let loaded = false;
let doneLoading = function(){
    loaded = true;
}
//export let piano = new Tone.Sampler(instrumentsSource.piano, doneLoadingInstrument(), path)
export let getInstrument = function(instrument) {
    let instrumentSample = new Tone.Sampler(instrumentsSource[instrument], doneLoading(), path)
    return instrumentSample
}

