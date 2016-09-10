// https://github.com/jaxgeller/counter.js/blob/master/counter.js
export default class Counter {

  constructor(opts) {
    this.start = opts.start;
    this.end = opts.end;
    this.selector = opts.selector;
    this.done = opts.done;
    this.duration = opts.duration || 2000;
  }

  run() {
    if (parseInt(this.selector.textContent) !== this.end) {
      requestAnimationFrame(this._tick.bind(this));
    }
  }

  _tick(currentTime) {
    let self = this; // uglify doesnt like to minify this

    if(!self.timeStart) self.timeStart = currentTime;

    self.timeElapsed = currentTime - self.timeStart;

    let next = self._ease(self.timeElapsed, self.start, self.end - self.start, self.duration);

    self.selector.textContent = Math.round(next);


    if (this.end < this.start) {
      if (next > self.end)
        return requestAnimationFrame(self._tick.bind(self));
    } else {
      if (next < self.end)
        return requestAnimationFrame(self._tick.bind(self));
    }

    return self.done();
  }


  _ease(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
  }
}
