"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { generateHiddenString, getRandomHiddenLetter } from "../helpers";
import { Text as DreiText } from "@react-three/drei";

type TProps = {
  text: string;
  size?: number;
} & JSX.IntrinsicElements["mesh"];

const Text: React.FC<TProps> = ({ text, size, ...rest }) => {
  const REVEALPACE = 75;
  const [indexToReveal, setIndexToReveal] = useState<number>(-1);
  const [indexesHidden, setIndexesHidden] = useState<number[]>([]);
  const [revealProgress, setRevealProgress] = useState<{
    count: number;
    output: string[];
  }>({
    count: 0,
    output: [],
  });
  const [outputLetters, setOutputLetters] = useState<string[]>(
    generateHiddenString(text)
  );
  const [outputString, setOutputString] = useState<string>();
  let count = 0;

  const randomizeHiddenLetters = (progress: {
    count: number;
    output: string[];
  }) => {
    if (progress.count % 4) {
      let result = progress.output.map((letter, index) => {
        if (indexesHidden.includes(index)) {
          return getRandomHiddenLetter();
        }
        return letter;
      });
      setOutputLetters(result);
    }
  };

  const revealLetter = () => {
    if (indexToReveal >= 0) {
      count++;
      let nextOutput = [...outputLetters];
      nextOutput[indexToReveal] = text.split("")[indexToReveal];

      setOutputLetters(nextOutput);
      setRevealProgress({
        count: count,
        output: nextOutput,
      });
    }
  };

  useEffect(() => {
    let revealIntervalId: any;
    let hiddenIndexes = [...Array(text.split("").length).keys()];

    const calcRevealIndex = () => {
      let next = [...hiddenIndexes];
      const revealIndex = Math.floor(Math.random() * next.length);
      const revealed = next.splice(revealIndex, 1);
      hiddenIndexes = next;

      setIndexToReveal(revealed[0]);
      setIndexesHidden(next);
      if (hiddenIndexes.length <= 0) {
        clearInterval(revealIntervalId);
      }
    };

    revealIntervalId = setInterval(calcRevealIndex, REVEALPACE);

    return () => clearInterval(revealIntervalId);
  }, []);

  useEffect(() => {
    revealLetter();
  }, [indexesHidden, indexToReveal]);

  useEffect(() => {
    randomizeHiddenLetters(revealProgress);
  }, [revealProgress]);

  useLayoutEffect(() => {
    setOutputString(outputLetters.join(""));
  }, [outputLetters]);

  return (
    <DreiText
      {...rest}
      font="/mono-font.ttf"
      fontSize={size || 2}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {outputString}
    </DreiText>
  );
};

export default Text;
