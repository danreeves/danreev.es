import random from './random';
import baffle from '../baffle/baffle.js'
import { CHARS } from '../constants';

export default function glitch () {
    const nextInterval = random(1500, 9000);
    const links = document.querySelectorAll('a');
    const link = links[random(0, links.length-1)];
    link.dataset.text = link.dataset.text || link.innerHTML;
    baffle(link, { characters: CHARS }).text(t => link.dataset.text).reveal(200);
    setTimeout(glitch, nextInterval);
}
