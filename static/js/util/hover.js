/* @flow */
/* global document HTMLElement Node */
import baffle from 'baffle';
import { CHARS } from '../constants';

function stop (b : baffle) : Function {
    return () : void => b.reveal(200);
}

export default function hover () {
    document.addEventListener('mouseover', (e : Event) => {
        const el = e.target;
        if (el instanceof HTMLElement && el.tagName === 'A') {
            for (let i = el.childNodes.length - 1; i >= 0; i--) {
                if (el.childNodes[i].nodeType === Node.ELEMENT_NODE) return;
            }
            el.dataset.text = el.dataset.text || el.innerHTML;
            const b = baffle(el, { characters: CHARS })
                .text(() : string => el.dataset.text)
                .start()
                .reveal(200);
            el.addEventListener('mouseout', stop(b));
        }
    });
}
