import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { applyTexture, createTunnelCurve, initWarpSpeed } from "./helpers";
import { MeshBasicMaterial, TubeGeometry } from "three";
import { TCalculations, TTextureParams, TTunnelProps } from "./types";
import Particle from "./Particle";

const Tunnel: React.FC<TTunnelProps> = ({
  playing,
  speed,
  warpspeed,
  setWarpspeed,
}) => {
  const mat = useRef<MeshBasicMaterial | null>(null);
  const tube = useRef<TubeGeometry | null>(null);
  const texture = useLoader(THREE.TextureLoader, "/gridlines.jpg");
  const numOfParticles = new Array(100).fill(0);
  const [calc, setCalc] = useState<TCalculations>({ 1: 0, 2: 0, 3: 0 });
  const [textureParams, setTextureParams] = useState<TTextureParams>({
    offsetX: 0,
    offsetY: 0,
    repeatX: 10,
    repeatY: 4,
  });
  const warpspeedTimeline = useMemo(() => {
    const timeline = gsap.timeline();
    initWarpSpeed(timeline, textureParams, setTextureParams);
    return timeline;
  }, []);

  const curve = useMemo(() => {
    return createTunnelCurve(calc);
  }, [calc]);

  useEffect(() => {
    if (warpspeed) {
      warpspeedTimeline.restart();
      setWarpspeed(false);
    }
  }, [warpspeed]);

  useFrame((state) => {
    applyTexture(textureParams, mat, curve, tube, speed, playing, state);
  });

  return (
    <group>
      <group
        onPointerMove={(event) => {
          setCalc({
            1: event.pointer.y * 0.1,
            2: -event.pointer.x * 0.1,
            3: -event.pointer.x * 0.1,
          });
        }}
      >
        <PerspectiveCamera makeDefault near={0.001} fov={8} far={1000} />
        <mesh>
          <tubeGeometry args={[curve, 70, 0.03, 50, false]} ref={tube} />
          <meshBasicMaterial
            ref={mat}
            map={texture}
            map-wrapS={THREE.MirroredRepeatWrapping}
            map-wrapT={THREE.MirroredRepeatWrapping}
            map-repeat={[5, 1]}
            side={THREE.BackSide}
          />
        </mesh>
        {numOfParticles.map((p, index) => (
          <Particle curve={curve} key={index} warpspeed={warpspeed} />
        ))}
      </group>
    </group>
  );
};
export default memo(Tunnel);
