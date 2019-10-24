exports.getKeyPegs = (colors, secretColors) => {
  let keyPegs = [];

  // find perfect matches AND
  // remove colors that have been correctly guessed from colors and secretColors
  colors.forEach((color, i) => {
    if (color === secretColors[i]) {
      keyPegs.push('white');
      // whiteIndexes.push(i);
      colors.splice(i, 1, null);
      secretColors.splice(i, 1, null);
      i--;
    }
  })

  // find partial matches (black pegs) AND remove those colors from arrays colors and secretColors
  colors.forEach((color => {
    if (color && secretColors.indexOf(color) > -1) {
      keyPegs.push('black');
      secretColors.splice(secretColors.indexOf(color), 1);
    }
  }));

  // fill keyPegs with empties if less than 4
  while (keyPegs.length < 4) {
    keyPegs[keyPegs.length] = null;
  }

  return keyPegs;
}