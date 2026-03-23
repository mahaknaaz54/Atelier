import { useRef } from 'react';
import { useSceneStore } from '../store/sceneStore';
import { MeshStandardMaterial, Color } from 'three';
import { useFrame } from '@react-three/fiber';

// Individual mesh that reactively lerps color
function ColorMesh({
  color,
  position,
  rotation,
  args,
  receiveShadow = false,
  roughness = 0.8,
  metalness = 0,
}: {
  color: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number];
  receiveShadow?: boolean;
  roughness?: number;
  metalness?: number;
}) {
  const matRef = useRef<MeshStandardMaterial>(null);
  useFrame(() => {
    if (matRef.current) {
      const target = new Color(color);
      matRef.current.color.lerp(target, 0.08);
    }
  });
  return (
    <mesh position={position} rotation={rotation ?? [0, 0, 0]} receiveShadow={receiveShadow}>
      <planeGeometry args={args} />
      <meshStandardMaterial ref={matRef} color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Sofa({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <group position={[0, -1.2, -2]}>
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[3, 0.7, 1.2]} />
        <meshStandardMaterial color="#2a2540" roughness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.85, -0.5]}>
        <boxGeometry args={[3, 0.8, 0.3]} />
        <meshStandardMaterial color="#1f1d33" roughness={0.9} />
      </mesh>
      {[-1.4, 1.4].map((x, i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 0.55, 0]}>
          <boxGeometry args={[0.25, 0.35, 1.2]} />
          <meshStandardMaterial color="#1f1d33" roughness={0.9} />
        </mesh>
      ))}
      {[-0.9, 0, 0.9].map((x, i) => (
        <mesh key={i} castShadow position={[x, 0.62, 0.1]}>
          <boxGeometry args={[0.9, 0.18, 1.1]} />
          <meshStandardMaterial color="#342f5c" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function CoffeeTable({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <group position={[0, -1.65, 0.8]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.06, 0.8]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0.1} />
      </mesh>
      {[[-0.7, -0.2, -0.35], [0.7, -0.2, -0.35], [-0.7, -0.2, 0.35], [0.7, -0.2, 0.35]].map((pos, i) => (
        <mesh key={i} castShadow position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.04, 0.04, 0.45, 8]} />
          <meshStandardMaterial color="#a08060" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function FloorLamp({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <group position={[2.8, -1.65, -2.5]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.03, 0.06, 2.8, 8]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFB4AA" emissive="#FFB4AA" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default function Room() {
  const wallColor = useSceneStore((s) => s.wallColor);
  const floorColor = useSceneStore((s) => s.floorColor);
  const ceilingColor = useSceneStore((s) => s.ceilingColor);
  const furnitureVisible = useSceneStore((s) => s.showFurniture);
  const glossiness = useSceneStore((s) => s.glossiness);
  const reflectivity = useSceneStore((s) => s.reflectivity);

  // glossiness and reflectivity are stored as 0–100 (matching slider scale)
  const roughness = 1 - glossiness / 100;
  const metalness = reflectivity / 200;
  const W = 8, H = 5, D = 8;

  return (
    <group>
      {/* Floor */}
      <ColorMesh color={floorColor} position={[0, -H/2, 0]} rotation={[-Math.PI/2, 0, 0]} args={[W, D]} receiveShadow roughness={roughness} metalness={metalness} />
      {/* Ceiling */}
      <ColorMesh color={ceilingColor} position={[0, H/2, 0]} rotation={[Math.PI/2, 0, 0]} args={[W, D]} roughness={0.95} />
      {/* Back wall */}
      <ColorMesh color={wallColor} position={[0, 0, -D/2]} args={[W, H]} receiveShadow roughness={roughness} metalness={metalness} />
      {/* Left wall */}
      <ColorMesh color={wallColor} position={[-W/2, 0, 0]} rotation={[0, Math.PI/2, 0]} args={[D, H]} receiveShadow roughness={roughness} metalness={metalness} />
      {/* Right wall */}
      <ColorMesh color={wallColor} position={[W/2, 0, 0]} rotation={[0, -Math.PI/2, 0]} args={[D, H]} receiveShadow roughness={roughness} metalness={metalness} />

      {/* Furniture */}
      <Sofa visible={furnitureVisible} />
      <CoffeeTable visible={furnitureVisible} />
      <FloorLamp visible={furnitureVisible} />

      {/* Decorative wall panel */}
      {furnitureVisible && (
        <mesh position={[0, 0.5, -D/2 + 0.02]} receiveShadow>
          <planeGeometry args={[2.4, 1.4]} />
          <meshStandardMaterial color="#201f1f" roughness={0.7} />
        </mesh>
      )}
      {/* Rug */}
      {furnitureVisible && (
        <mesh position={[0, -H/2 + 0.01, -0.5]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.5, 2.2]} />
          <meshStandardMaterial color="#D8BAFA" roughness={0.98} opacity={0.85} transparent />
        </mesh>
      )}
    </group>
  );
}
