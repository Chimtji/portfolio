export const getRandomHiddenLetter = (): string => {
  const ASCII = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_abcdefghijklmnopqrstuvwxyz{|}~`;
  const hiddenLetters = ASCII.split("");
  const hiddenLetter =
    hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];

  return hiddenLetter;
};
export const generateHiddenString = (str: string): string[] => {
  const length = str.split("").length;
  const array = [...Array(length)];

  for (var i = 0; i < length; i++) {
    array[i] = getRandomHiddenLetter();
  }

  return array;
};

// Lol.. what kind of name is this - haha
export const randomNumberbetweenNegAndPos003 = () => {
  let randomNumber = Math.random();
  randomNumber = (randomNumber - 0.5) * 0.06;

  return randomNumber;
};
