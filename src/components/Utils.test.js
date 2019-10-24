import { getKeyPegs } from './Utils.js'

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