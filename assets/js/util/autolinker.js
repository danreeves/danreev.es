import baffle from '../baffle/baffle.js';
import { CHARS, LINKS } from '../constants';

export default function autoLinker (selector) {
    const el = document.querySelector(selector);
    let text = el.innerHTML;
    LINKS.forEach(function (l) {
        text = text.replace(l.link, `<a href="${l.to}">${l.link}</a>`);
    });
    el.innerHTML = text;
    setTimeout(function () {
        baffle('a', { characters:CHARS }).reveal(500);
    }, 16);
}
