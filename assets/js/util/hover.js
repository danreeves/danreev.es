import baffle from '../baffle/baffle.js';
import { CHARS } from '../constants';
function stop (b) {
    return function (e) {
        e.target.classList.remove('hover');
        b.reveal(200);
    }
}
export default function hover () {
    document.addEventListener('mouseover', function (e) {
        if (e.target.tagName === 'A') {
            e.target.dataset.text = e.target.dataset.text ||e.target.innerHTML;
            const b = baffle(e.target, { characters: CHARS }).text(t => e.target.dataset.text).start().reveal(200);
            e.target.addEventListener('mouseout', stop(b));
        }
    });
}
