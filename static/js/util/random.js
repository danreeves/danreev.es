/* @flow */
export default function random (start : number, end : number) : number {
    return Math.floor(Math.random() * end) + start;
}
