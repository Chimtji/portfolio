import { Dispatch, SetStateAction } from "react";

export type TTunnelProps = {
  playing: boolean;
  speed: number;
  warpspeed: boolean;
  setWarpspeed: Dispatch<SetStateAction<boolean>>;
};
export type TCalculations = {
  1: number;
  2: number;
  3: number;
};
export type TTextureParams = {
  offsetX: number;
  offsetY: number;
  repeatX: number;
  repeatY: number;
};
