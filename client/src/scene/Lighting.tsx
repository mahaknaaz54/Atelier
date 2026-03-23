import { useSceneStore } from '../store/sceneStore';

export default function Lighting() {
  const lightingMode = useSceneStore((s) => s.lightingMode);
  const lightIntensity = useSceneStore((s) => s.lightIntensity);

  const intensity = lightIntensity / 100;
  const isDay = lightingMode === 'day';

  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={isDay ? 0.4 * intensity : 0.15 * intensity} color={isDay ? '#fff8f0' : '#a0a8cc'} />

      {/* Main directional (sun/moon) */}
      <directionalLight
        position={isDay ? [5, 8, 5] : [-3, 6, -4]}
        intensity={isDay ? 1.8 * intensity : 0.6 * intensity}
        color={isDay ? '#fffbf0' : '#c8d0ff'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.001}
      />

      {/* Fill light */}
      <directionalLight
        position={[-4, 4, 3]}
        intensity={isDay ? 0.4 * intensity : 0.2 * intensity}
        color={isDay ? '#e8f0ff' : '#8090cc'}
      />

      {/* Accent point light (lamp-like) */}
      <pointLight
        position={[2.8, 1.5, -2.5]}
        intensity={isDay ? 0.6 * intensity : 1.2 * intensity}
        color={isDay ? '#D2B48C' : '#FFB4AA'}
        distance={6}
        decay={2}
      />

      {/* Soft hemisphere sky */}
      <hemisphereLight
        args={[
          isDay ? '#c8e0ff' : '#1a1a3a',
          isDay ? '#b8a080' : '#0a0a15',
          isDay ? 0.3 * intensity : 0.1 * intensity,
        ]}
      />
    </>
  );
}
