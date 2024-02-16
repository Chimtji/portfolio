import { useThree } from "@react-three/fiber";
import Text from "../Text";
type TProps = {
  //
};
const Navbar: React.FC<TProps> = ({}) => {
  const { viewport } = useThree();

  return (
    <group>
      <Text text="+45 60 57 87 36" position={[3, 0, 0]} />
      <Text text="kim@orsoe.me" position={[4.75, -2.5, 0]} />
      {/* <Text text="Contact" /> */}
    </group>
  );
};
export default Navbar;
