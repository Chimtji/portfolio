import { Bounds, Plane } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { createRef, useEffect, useMemo, useState } from "react";
import { BufferGeometry, Mesh, NormalBufferAttributes, FrontSide } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

type TProps = {
  name: string;
  x?: number;
  y?: number;
  onClick?: () => void;
};

const Icon: React.FC<TProps> = ({ name, x = 0, y = 0, onClick }) => {
  const svgData = useLoader(SVGLoader, `/${name}.svg`);
  const shapes = useMemo(() => {
    return svgData.paths.map((p) => p.toShapes(true));
  }, [svgData]);
  const ref = createRef<Mesh<BufferGeometry<NormalBufferAttributes>>>();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group
      onClick={onClick}
      scale={0.15}
      position={[x, y, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <planeGeometry args={[16, 16]} />
        <meshPhongMaterial color="#ff0000" opacity={0} transparent />
      </mesh>
      {shapes.map((shape, index) => (
        <mesh key={index} ref={ref} position={[-11.75, -11.75, 0]}>
          <extrudeGeometry
            args={[
              shape,
              { bevelSize: 0, bevelThickness: 0, depth: 0, steps: 0 },
            ]}
          />
          <meshBasicMaterial color="orange" side={FrontSide} />
        </mesh>
      ))}
    </group>
  );
};

export default Icon;
