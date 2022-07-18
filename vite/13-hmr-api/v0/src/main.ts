import { render } from './render';
import { initState } from './state';

render();
initState();

if (import.meta.hot) {
    console.log(import.meta.hot);
    
 import.meta.hot.accept((mod) => mod.render())
}