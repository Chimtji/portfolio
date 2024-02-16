import React, { useEffect, useRef, useState } from "react";
import classes from "./styles.module.css";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";

function TVNoise(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    function resize() {
      if (canvas) {
        canvas.width = (window.innerWidth * window.devicePixelRatio) / 2;
        canvas.height = (window.innerHeight * window.devicePixelRatio) / 2;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
      }
    }

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  function noise(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      const iData = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(iData.data.buffer);
      const len = buffer32.length;
      let i = 0;

      for (; i < len; i++) {
        if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
      }

      ctx.putImageData(iData, 0, 0);
    }

    // for (let x = 0; x < ctx.canvas.width; x++) {
    //   for (let y = 0; y < ctx.canvas.width; y++) {
    //     const renderBlack = Math.random() > 0.5;
    //     if (renderBlack) {
    //       ctx.fillStyle = "rgb(0,0,0)";
    //     } else {
    //       ctx.fillStyle = "rgb(255,255,255)";
    //     }

    //     ctx.fillRect(x, y, size, size);
    //   }
    // }
  }

  const nextAnimationFrameHandler = (progress: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    if (ctx) {
      noise(ctx);
    }
  };

  useAnimationFrame({
    nextAnimationFrameHandler,
    shouldAnimate,
    duration: Number.POSITIVE_INFINITY,
  });

  return <canvas ref={canvasRef} className={classes.root} />;
}

export default TVNoise;
