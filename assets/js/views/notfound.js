import baffle from '../baffle/baffle.js';
import { CHARS } from '../constants';

export default function notfound () {
    const b = baffle('.skull-404', {
        characters: CHARS,
        exclude: [' ', '\n', '4', '0'],
        speed: 64,
    }).start();
}
