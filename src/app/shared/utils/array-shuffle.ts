export function arrayShuffle<T>(array: T[]): T[] {
  for (let first = array.length - 1; first > 0; first -= 1) {
    const second = Math.floor(Math.random() * (first + 1));
    [array[first], array[second]] = [array[second], array[first]];
  }
  return array;
}
