import { useFrame, useThree } from "@react-three/fiber";
import {
  RefObject,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

type TProps = {
  //
};

const Stars: React.FC<TProps> = ({}) => {
  const { viewport } = useThree();
  const [particles, setParticles] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const MeshMaterial = () =>
    useMemo(
      () => (
        <meshStandardMaterial color="#ffffff" blending={AdditiveBlending} />
      ),
      []
    );

  const Geometry = useMemo(() => () => <circleGeometry args={[1.5, 5]} />, []);

  const Particle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const particle: RefObject<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    > = createRef();

    const widthRadius = 100;
    const heightRadius = 100;

    useFrame(({ clock }) => {
      if (particle.current) {
        const timer = clock.getElapsedTime();
        particle.current.position.z += 0.005;
      }
    });

    useEffect(() => {
      if (particle.current) {
        particle.current.position.z = -3;
        particle.current.position.x =
          -viewport.width / 2 + Math.random() * viewport.width;
        particle.current.position.y =
          -viewport.height / 2 + Math.random() * viewport.height;
      }
    }, []);

    return (
      <mesh ref={particle} scale={0.02}>
        {children}
      </mesh>
    );
  };

  return (
    <group>
      {particles?.map((particle, index) => (
        <Particle key={index}>
          <Geometry />
          <MeshMaterial />
        </Particle>
      ))}
    </group>
  );
};
export default Stars;
