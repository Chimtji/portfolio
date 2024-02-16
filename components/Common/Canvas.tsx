import { CanvasProps, Canvas as ThreeCanvas } from "@react-three/fiber";
import { MutableRefObject, Ref, Suspense } from "react";
import {
  BrightnessContrast,
  EffectComposer,
  Pixelation,
  Bloom,
  Noise,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { BlendFunction } from "postprocessing";

import { useViewportSize } from "@mantine/hooks";

type TProps = {
  children: React.ReactNode;
  withEffects?: boolean;
  ui?: boolean;
} & CanvasProps;
const Canvas: React.FC<TProps> = ({
  children,
  withEffects = true,
  ui,
  ...rest
}) => {
  const { width, height } = useViewportSize();
  return (
    <ThreeCanvas {...rest} className={rest.className}>
      <Suspense fallback={null}>
        <ambientLight />
        {children}
        {withEffects && (
          <EffectComposer>
            <BrightnessContrast brightness={0} contrast={0.3} />
            {!ui ? <Pixelation granularity={2} /> : <></>}
            <Bloom
              opacity={0.5}
              blendFunction={BlendFunction.ADD}
              radius={0.5}
              intensity={10}
              kernelSize={KernelSize.LARGE}
              luminanceThreshold={0.125}
              luminanceSmoothing={0}
              mipmapBlur={false}
              resolutionX={width}
              resolutionY={height}
            />
            <Noise
              premultiply
              blendFunction={BlendFunction.DARKEN}
              opacity={1}
            />
          </EffectComposer>
        )}
      </Suspense>
    </ThreeCanvas>
  );
};
export default Canvas;
