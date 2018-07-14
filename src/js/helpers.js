// This file is a set of miscellaneous idempotent helper functions

// Randomly shuffle the elements of an array/list
function knuth_shuffle(to_shuffle) {
  let i = to_shuffle.length;
  let tempVal;
  let randomIndex;

  while (i !== 0) {
      // Pick a remaining element from [0,i-1]
      randomIndex = Math.floor(Math.random() * i);
      i -= 1;

      // Swap it with the current element
      tempVal = to_shuffle[i];
      to_shuffle[i] = to_shuffle[randomIndex];
      to_shuffle[randomIndex] = tempVal;
  }

  return to_shuffle;
}