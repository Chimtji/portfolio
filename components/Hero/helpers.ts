import { RootState, Vector3 } from "@react-three/fiber";
import { Dispatch, RefObject, SetStateAction } from "react";
import * as THREE from "three";
import { Power1, Power2 } from "gsap";
import { LineProps } from "@react-three/drei";
import { TCalculations, TTextureParams } from "./types";

export const createTunnelCurve = (
  calc: TCalculations
): THREE.CatmullRomCurve3 => {
  // Create an empty array to stores the points
  var points = [];

  // Define points along Z axis
  for (var i = 0; i < 6; i += 1) {
    points.push(new THREE.Vector3(0, 0, -2.5 * (i / 4)));
  }

  points[1].y -= 0.01;
  points[2].y = calc["1"];
  points[3].y -= 0.08;
  points[4].y = -0.08;
  points[2].x = calc["2"];
  points[4].x = calc["3"];

  // Create a curve based on the points
  var curve = new THREE.CatmullRomCurve3(points);
  return curve;
};

export const applyTexture = (
  textureParams: {
    offsetX: number;
    offsetY: number;
    repeatX: number;
    repeatY: number;
  },
  mat: RefObject<THREE.MeshBasicMaterial>,
  curve: THREE.CatmullRomCurve3,
  tube: RefObject<THREE.TubeGeometry>,
  speed: number,
  playing: boolean,
  state: RootState
) => {
  if (
    mat &&
    mat.current &&
    mat.current.map &&
    curve &&
    curve.points &&
    tube &&
    tube.current
  ) {
    if (playing) {
      mat.current.map.offset.x += textureParams.offsetX + speed;
    } else {
      mat.current.map.offset.x += textureParams.offsetX;
    }
    mat.current.map.offset.y += 0.001;
    mat.current.map.repeat.set(textureParams.repeatX, textureParams.repeatY);
  }
};

export const initWarpSpeed = (
  timeline: gsap.core.Timeline,
  textureParams: TTextureParams,
  setTextureParams: Dispatch<SetStateAction<TTextureParams>>
) => {
  timeline.pause();
  timeline.to(textureParams, {
    duration: 4,
    repeatX: 0.3,
    ease: Power1.easeInOut,
  });
  timeline.to(
    textureParams,
    {
      offsetX: 8,
      ease: Power2.easeInOut,
      duration: 12,
    },
    0
  );
  timeline.to(
    textureParams,
    {
      duration: 6,
      repeatX: 10,
      ease: Power2.easeInOut,
    },
    "-=5"
  );

  setTextureParams(textureParams);
};
