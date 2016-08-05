import { SKULL, CHARS, BLACKLIST, REPLACEMENTS } from '../constants';
import baffle from '../baffle/baffle.js';
import autoLinker from '../util/autolinker';

export default function home () {

    const skullEl = document.querySelector('.skull');
    const noskullEl = document.querySelector('.no-skull');
    skullEl.innerHTML = SKULL;
    noskullEl.innerHTML = '';

    const b = baffle('.skull', {
        characters: CHARS,
        exclude: [' ', '\n', '4', '0'],
        speed: 64,
    }).start();

    setTimeout(function () {
        b.reveal(1000);

        setTimeout(function () {
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

        }, 1000);

    }, 1500);
};
