import { SKULL, CHARS, BLACKLIST, REPLACEMENTS } from '../constants';
import baffle from 'baffle';
import autoLinker from '../util/autolinker';

const revealTime = 1000;
const delayTime = 1000;

export default function home () {

    const skullEl = document.querySelector('.skull');
    const noskullEl = document.querySelector('.no-skull');
    skullEl.innerHTML = SKULL;
    noskullEl.innerHTML = '';

    const b = baffle('.skull', {
        characters: CHARS,
        exclude: [' ', '\n'],
        speed: 64,
    }).start();

    b.reveal(revealTime, delayTime);

    setTimeout(function scrollText () {
        let lastChar = '';
        let interval = setInterval(function () {
            const text = skullEl.innerHTML;
            if (!text.length) {
                clearInterval(interval);
                autoLinker('.no-skull');
            }

            let next = text.slice(0, 1);
            next = (BLACKLIST.indexOf(next) > -1) ? ' ' : next;

            let newText = noskullEl.innerHTML + next;
            newText = newText.replace(/\s+/g, ' ');
            REPLACEMENTS.forEach(r => newText = newText.replace(r.match, r.with))

            noskullEl.innerHTML = newText;
            skullEl.innerHTML = text.slice(1, skullEl.innerHTML.length);
            lastChar = next;
        }, 1);

    }, revealTime + delayTime);
};
