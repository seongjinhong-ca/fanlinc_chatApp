/**
 * A simple function that allows you to do await asyncDelay(xxx) to do a quick fake delay.
 * @param delay
 */
export const asyncDelay = (delay: number) => {
  return new Promise(res => {
    setTimeout(res, delay);
  });
};
