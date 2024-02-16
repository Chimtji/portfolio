import { Cylinder } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  BufferGeometry,
  InstancedMesh,
  InstancedMeshEventMap,
  Material,
  NormalBufferAttributes,
} from "three";
import { randomNumberbetweenNegAndPos003 } from "../../helpers";

type TProps = {
  curve: THREE.CatmullRomCurve3;
  warpspeed: boolean;
};

const Particle: React.FC<TProps> = ({ curve, warpspeed }) => {
  const ref = useRef<InstancedMesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    InstancedMeshEventMap
  > | null>(null);
  const speed = 0.0001;
  let viewport = useThree((state) => state.viewport);

  useEffect(() => {
    if (ref.current) {
      ref.current.count = Math.random() * curve.getLength();
    }
  }, []);

  let offset = useMemo(() => {
    return new THREE.Vector3(
      randomNumberbetweenNegAndPos003(),
      randomNumberbetweenNegAndPos003(),
      0
    );
  }, [viewport]);

  useFrame(() => {
    if (ref.current) {
      // We use the count as the progress indicator
      // (Because it's an unused variable)
      // We do this because this value persists, and states will cause rerender
      // which will make the particle go back to start, whenever the curve is changed
      const pos = curve.getPoint(1 - (ref.current.count % 1)).add(offset);
      ref.current.position.z = pos.z;
      ref.current.position.x = pos.x;
      ref.current.position.y = pos.y;
      ref.current.count += speed;
    }
  });

  return (
    <group>
      <instancedMesh ref={ref} scale={0.0025} position={[0, 0, 0]}>
        <Cylinder
          scale={0.05}
          args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshPhongMaterial color="orange" />
        </Cylinder>
      </instancedMesh>
    </group>
  );
};

export default memo(Particle);
