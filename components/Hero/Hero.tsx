import Canvas from "../Common/Canvas";
import Tunnel from "./Tunnel";
import Controls from "./Controls";
import Border from "./Border";
import { Box, Container } from "@mantine/core";
import { useState } from "react";
import classes from "./styles.module.css";
import gsap from "gsap";
import Navbar from "./Navbar";
import Text from "../Text";

type TProps = {
  //
};
const Hero: React.FC<TProps> = () => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [warpspeed, setWarpspeed] = useState<boolean>(false);

  return (
    <Container size="130em" p="md" h="100vh" w="100vw" mih="50vh" mah="90vh">
      <Box className={classes.content}>
        <Canvas>
          <Tunnel
            playing={playing}
            speed={0.005}
            warpspeed={warpspeed}
            setWarpspeed={setWarpspeed}
          />
        </Canvas>
        <Canvas className={classes.canvasBorder}>
          <Text text="Hi, I'm Kim" size={1} />
          <Border />
        </Canvas>
        <Canvas ui className={classes.canvasUi}>
          <Controls
            playing={playing}
            updatePlaying={setPlaying}
            updateWarpspeed={setWarpspeed}
          />
        </Canvas>
        <Canvas ui className={classes.canvasNavbar}>
          <Navbar />
        </Canvas>
        <Canvas ui className={classes.canvasTagline}>
          <Text text="Design &" position={[-8.75, 1.5, 0]} size={1.5} />
          <Text
            text="Frontend Development"
            position={[-3.5, -0.5, 0]}
            size={1.5}
          />
        </Canvas>
      </Box>
    </Container>
  );
};
export default Hero;
