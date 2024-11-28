import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { OrbitControls, Stars } from "@react-three/drei";
import PointsGroup from "./PointsGroup";
import { useState } from "react";
import ControlsBar from "./ControlsBar";

const defaultControls: Controls = {
  tailLength: 40,
};

export default function R3FCanvas() {
  const [controls, setControls] = useState<Controls>(defaultControls);
  return (
    <>
      <ControlsBar controls={controls} setControls={setControls} />
      <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
        <Stars />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            mipmapBlur
          />
        </EffectComposer>
        <PointsGroup tailLength={controls.tailLength} />
        <hemisphereLight args={[0xffffff, 0x000000, 1.0]} />
        <OrbitControls />
      </Canvas>
    </>
  );
}
