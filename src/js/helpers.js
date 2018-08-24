// This file is a set of miscellaneous idempotent helper functions

// Randomly shuffle the elements of an array/list
function knuthShuffle(toShuffle) { // eslint-disable-line no-unused-vars
  let i = toShuffle.length;
  let tempVal;
  let randomIndex;

  while (i !== 0) {
    // Pick a remaining element from [0,i-1]
    randomIndex = Math.floor(Math.random() * i);
    i -= 1;

    // Swap it with the current element
    tempVal = toShuffle[i];
    toShuffle[i] = toShuffle[randomIndex];
    toShuffle[randomIndex] = tempVal;
  }

  return toShuffle;
}
