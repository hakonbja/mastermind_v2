exports.getKeyPegs = (colors, secretColors) => {
  let keyPegs = [];
  let guess = Array.from(colors);
  let answer = Array.from(secretColors);

  // find perfect matches AND
  // remove colors that have been correctly guessed from guess and answer
  guess.forEach((color, i) => {
    if (color === answer[i]) {
      keyPegs.push('white');
      // whiteIndexes.push(i);
      guess.splice(i, 1, null);
      answer.splice(i, 1, null);
      i--;
    }
  })

  // find partial matches (black pegs) AND remove those colors from arrays guess and answer
  guess.forEach((color => {
    if (color && answer.indexOf(color) > -1) {
      keyPegs.push('black');
      answer.splice(answer.indexOf(color), 1);
    }
  }));

  // fill keyPegs with empties if less than 4
  while (keyPegs.length < 4) {
    keyPegs[keyPegs.length] = null;
  }

  return keyPegs;
}