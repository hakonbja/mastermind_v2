import { getKeyPegs, didWin } from './Utils.js'


// getKeyPegs()
test('correct guess', () => {
  const guess = ['a', 'a', 'a', 'a'];
  const answer = ['a', 'a', 'a', 'a'];
  const keyPegs = getKeyPegs(guess, answer);
  expect(keyPegs).toEqual(["white", "white", "white", "white"]);
});

test('completely incorrect guess', () => {
  const guess = ['a', 'a', 'a', 'a'];
  const answer = ['b', 'b', 'b', 'b'];
  const keyPegs = getKeyPegs(guess, answer);
  expect(keyPegs).toEqual([null, null, null, null]);
});

test('incomplete but correct guess', () => {
  const guess = ['a', 'a', 'a'];
  const answer = ['a', 'a', 'a', 'a'];
  const keyPegs = getKeyPegs(guess, answer);
  expect(keyPegs).toEqual(["white", "white", "white", null]);
});

test('only partially correct guesses', () => {
  const guess = ['a', 'a', 'b', 'b'];
  const answer = ['b', 'b', 'a', 'a'];
  const keyPegs = getKeyPegs(guess, answer);
  expect(keyPegs).toEqual(["black", "black", "black", "black"]);
});

test('mix of correct and partially correct guesses', () => {
  const guess = ['a', 'b', 'd', 'c'];
  const answer = ['a', 'b', 'c', 'd'];
  const keyPegs = getKeyPegs(guess, answer);
  expect(keyPegs).toEqual(["white", "white", "black", "black"]);
});

test('no guess', () => {
  const guess = [];
  const answer = ['a', 'b', 'c', 'd'];
  const keyPegs = getKeyPegs(guess, answer);
  expect(keyPegs).toEqual([null, null, null, null]);
});

// didWin()
test('did win', () => {
  const status = didWin(["white", "white", "white", "white"]);
  expect(status).toBeTruthy();
});

test('did not win', () => {
  const status = didWin(["white", "white", "white", "black"]);
  expect(status).toBeFalsy();
});

test('incomplete keyPegs array', () => {
  const status = didWin(["white", "white", "white"]);
  expect(status).toBeFalsy();
});