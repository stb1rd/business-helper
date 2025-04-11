/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
export function debounce(callee, timeoutMs) {
  return function perform(...args) {
    const previousCall = this.lastCall;

    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
}
