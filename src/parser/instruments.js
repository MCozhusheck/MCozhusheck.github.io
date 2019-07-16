import Tone from 'tone';
import { instrumentsSource } from './instrumentsSource';
const baseUrl = '/MusicLang/samples/';


let instrumentsList = ['bass-electric','bassoon','cello','clarinet','contrabass','flute','french-horn','guitar-acoustic','guitar-electric','guitar-nylon', 'harmonium','harp','organ','piano','saxophone','trombone','trumpet','tuba','violin','xylophone'];

export let getInstrument = function(instrument) {
    let instrumentSample = new Tone.Sampler(instrumentsSource[instrument], console.log('Loaded samples'), baseUrl.concat(instrument+'/'))
    return instrumentSample
}

