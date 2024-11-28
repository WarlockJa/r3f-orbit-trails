import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";

function IcoSpherePoints({ index }: { index: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const offset = index * 0.01;
  let elapsedTime = 0;
  useFrame((_, dTime) => {
    if (!pointsRef.current) return;

    elapsedTime += dTime * 0.2;
    pointsRef.current.rotation.x = elapsedTime + offset;
    pointsRef.current.rotation.y = elapsedTime + offset;
  });

  const icoGeo = new THREE.IcosahedronGeometry(2, 4);
  const colors = [];
  const col = new THREE.Color();
  const icoVerts = icoGeo.attributes.position;
  const p = new THREE.Vector3();
  for (let i = 0; i < icoVerts.count; i += 1) {
    p.fromBufferAttribute(icoVerts, i);
    const hue = 0.3 + p.x * 0.15;
    const light = index * 0.015;
    const { r, g, b } = col.setHSL(hue, 1.0, light);
    colors.push(r, g, b);
  }

  const colorsBuffer = new Float32Array(colors);
  const sprite = useLoader(THREE.TextureLoader, "./circle.png");
  const size = index * 0.0015;
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={icoVerts.count}
          array={icoVerts.array}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={icoVerts.count}
          array={colorsBuffer}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={size}
        map={sprite}
        alphaTest={0.5}
        transparent={true}
      />
    </points>
  );
}

export default function PointsGroup({
  tailLength = 40,
}: {
  tailLength?: number;
}) {
  const pointsN = tailLength > 0 && tailLength < 100 ? tailLength : 40;
  const children = [];
  for (let i = 0; i < pointsN; i += 1) {
    children.push(<IcoSpherePoints index={i} key={i} />);
  }
  return <group>{children}</group>;
}
