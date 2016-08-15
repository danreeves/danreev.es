/* global document */
import baffle from 'baffle';
import { CHARS } from '../constants';

function stop (b) {
    return (e) => {
        e.target.classList.remove('hover');
        b.reveal(200);
    };
}

export default function hover () {
    document.addEventListener('mouseover', (e) => {
        const el = e.target;
        if (el.tagName === 'A') {
            el.dataset.text = el.dataset.text || el.innerHTML;
            const b = baffle(el, { characters: CHARS })
                .text(() => el.dataset.text)
                .start()
                .reveal(200);
            el.addEventListener('mouseout', stop(b));
        }
    });
}
