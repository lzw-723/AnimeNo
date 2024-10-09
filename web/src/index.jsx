import {render} from 'solid-js/web';
import App from './App';
import {createEffect} from "solid-js";


render(() => {
    createEffect(() => {
        // document.head.getElementsByTagName('title')[0].innerText = 'Hello World';
        console.log('fdf')
    })
    return (<App/>);
}, document.getElementById('root'));
