import { Suspense, useRef, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Environment } from '@react-three/drei';
import { useSceneStore } from '../store/sceneStore';
import Room from './Room';
import Lighting from './Lighting';

interface SceneCanvasProps {
  onScreenshot?: (dataUrl: string) => void;
}

export default function SceneCanvas({ onScreenshot }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightingMode = useSceneStore((s) => s.lightingMode);

  const handleCreated = useCallback(
    ({ gl }: { gl: { domElement: HTMLCanvasElement } }) => {
      (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = gl.domElement;
    },
    []
  );

  const takeScreenshot = useCallback(() => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      if (onScreenshot) onScreenshot(dataUrl);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `atelier-room-${Date.now()}.png`;
      a.click();
    }
  }, [onScreenshot]);

  // Expose screenshot function to window for TopBar button
  useEffect(() => {
    (window as Window & { atelierScreenshot?: () => void }).atelierScreenshot = takeScreenshot;
    return () => {
      delete (window as Window & { atelierScreenshot?: () => void }).atelierScreenshot;
    };
  }, [takeScreenshot]);

  return (
    <div className="w-full h-full relative">
      {/* Lighting mode badge */}
      <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${lightingMode === 'day' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
        <span className="font-headline text-[10px] uppercase tracking-widest text-[#c4c9ac]">
          {lightingMode === 'day' ? 'Daylight' : 'Night Mode'}
        </span>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 1.5, 7], fov: 50 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        onCreated={handleCreated}
        style={{ background: '#131313' }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Room />
          <Environment preset={lightingMode === 'day' ? 'apartment' : 'night'} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 - 0.05}
            target={[0, 0, 0]}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
