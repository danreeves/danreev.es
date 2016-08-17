/* @flow */
import baffle from 'baffle';
import { CHARS } from '../constants';

export default function notfound () {
    baffle('.skull-404', {
        characters: CHARS,
        exclude: [' ', '\n', '4', '0'],
        speed: 64,
    }).start();
}
