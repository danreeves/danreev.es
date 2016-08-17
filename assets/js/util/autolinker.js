/* @flow */
/* global document */
import baffle from 'baffle';
import { CHARS, LINKS } from '../constants';

export default function autoLinker (selector : string) {
    const el = document.querySelector(selector);
    let text = el.innerHTML;
    LINKS.forEach((l : Object) => {
        text = text.replace(l.link, `<a href="${l.to}" data-text="${l.link}">${l.link}</a>`);
    });
    el.innerHTML = text;
    setTimeout(() => {
        baffle('a', { characters: CHARS }).reveal(200);
    }, 16);
}
