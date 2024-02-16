import { useThree } from "@react-three/fiber";
import Icon from "../Icon";
import { Dispatch, SetStateAction, useState } from "react";
import classes from "./styles.module.css";
type TProps = {
  playing: boolean;
  updatePlaying: Dispatch<SetStateAction<boolean>>;
  updateWarpspeed: Dispatch<SetStateAction<boolean>>;
};
const Controls: React.FC<TProps> = ({
  playing,
  updatePlaying,
  updateWarpspeed,
}) => {
  const { viewport } = useThree();

  const handlePause = () => {
    updatePlaying(false);
  };

  const handlePlay = () => {
    updatePlaying(true);
  };

  const handleWarpspeed = () => {
    updateWarpspeed(true);
  };
  const handlePower = () => {};

  return (
    <group>
      {playing ? (
        <Icon
          name="player-pause"
          x={viewport.width / 2 - 15.5}
          y={0}
          onClick={handlePause}
        />
      ) : (
        <Icon
          name="player-play"
          x={viewport.width / 2 - 15.5}
          y={0}
          onClick={handlePlay}
        />
      )}
      <Icon
        name="player-track-next"
        x={viewport.width / 2 - 10}
        y={0}
        onClick={handleWarpspeed}
      />
      <Icon
        name="power"
        x={viewport.width / 2 - 4.5}
        y={0}
        onClick={handlePower}
      />
    </group>
  );
};
export default Controls;
