/* global window document */
import views from './views';
import glitch from './util/glitch';
import hover from './util/hover';

window.onload = function onload () {
    const page = document.querySelector('body').classList;
    if (page && typeof views[page] === 'function') {
        views[page]();
    }

    glitch();
    hover();
};
