import { Line, Text } from "@react-three/drei";
import Canvas from "../Common/Canvas";
import { useThree } from "@react-three/fiber";

type TProps = {
  //
};
const Border: React.FC<TProps> = () => {
  const { viewport } = useThree();
  const widthEdge = viewport.width / 2 - 0.01;
  const heightEdge = viewport.height / 2 - 0.01;
  return (
    <>
      <Line
        color="orange"
        lineWidth={1}
        points={[
          [-widthEdge, heightEdge, 0],
          [widthEdge, heightEdge, 0],
        ]}
      />
      <Line
        color="orange"
        lineWidth={1}
        points={[
          [-widthEdge, -heightEdge, 0],
          [widthEdge, -heightEdge, 0],
        ]}
      />
      <Line
        color="orange"
        lineWidth={1}
        points={[
          [widthEdge, heightEdge, 0],
          [widthEdge, -heightEdge, 0],
        ]}
      />
      <Line
        color="orange"
        lineWidth={1}
        points={[
          [-widthEdge, heightEdge, 0],
          [-widthEdge, -heightEdge, 0],
        ]}
      />
    </>
  );
};
export default Border;
