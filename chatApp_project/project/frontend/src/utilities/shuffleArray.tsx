/**
 * Shuffle array in-place
 * Source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param a
 */
export const shuffleArray = (a: any[]) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};
