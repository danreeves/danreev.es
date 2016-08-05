import views from './views';

window.onload = function onload () {
    const page = document.querySelector('body').classList;
    if (page && typeof views[page] === 'function') {
        views[page]();
    }

}
