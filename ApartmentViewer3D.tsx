"use client";

import { useRef, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import { Box, Palette, RotateCcw, Maximize2 } from "lucide-react";
import * as THREE from "three";
import { styleDetails } from "@/lib/palette-data";

const styleKeys = ["modern", "scandi", "eastern", "loft", "luxury", "minimal"] as const;
type StyleKey = (typeof styleKeys)[number];

const styleConfigs: Record<StyleKey, { wall: string; floor: string; accent: string; furniture: string; rug: string; light: string; ceiling: string }> = {
  modern:   { wall: "#2A2A3E", floor: "#1A1A2E", accent: "#5B5FEF", furniture: "#3D52A0", rug: "#339AF0", light: "#EEEEEE", ceiling: "#1E1E30" },
  scandi:   { wall: "#F5F0E8", floor: "#D4C5A9", accent: "#8B7355", furniture: "#E8DDD0", rug: "#8FBC8F", light: "#FAFAFA", ceiling: "#FFFFFF" },
  eastern:  { wall: "#2C1A0E", floor: "#1C0A00", accent: "#C8860A", furniture: "#8B1A1A", rug: "#C8860A", light: "#F5DEB3", ceiling: "#1A0E04" },
  loft:     { wall: "#3A3A3A", floor: "#2A2A2A", accent: "#E07B39", furniture: "#555555", rug: "#666666", light: "#CCCCCC", ceiling: "#2E2E2E" },
  luxury:   { wall: "#1C1C1C", floor: "#0D0D0D", accent: "#C9A84C", furniture: "#2C1810", rug: "#8B1A1A", light: "#F5F0E8", ceiling: "#111111" },
  minimal:  { wall: "#E5E5E5", floor: "#D0D0D0", accent: "#757575", furniture: "#BDBDBD", rug: "#CCCCCC", light: "#FAFAFA", ceiling: "#F5F5F5" },
};

function Room({ activeStyle }: { activeStyle: StyleKey }) {
  const groupRef = useRef<THREE.Group>(null);
  const config = styleConfigs[activeStyle];

  // Smooth color transition using lerp — traverses and updates ALL meshes
  // tagged with userData.paintKey (handles multiple meshes per key, e.g. sofa+coffee+side table).
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const key = obj.userData?.paintKey as keyof typeof config | undefined;
      if (!key || !(key in config)) return;
      const mat = obj.material as THREE.Material | THREE.Material[];
      const m = Array.isArray(mat) ? mat[0] : mat;
      if (!(m instanceof THREE.MeshStandardMaterial)) return;
      const target = new THREE.Color(config[key]);
      m.color.lerp(target, Math.min(1, delta * 4));
    });
  });

  return (
    <group ref={groupRef}>
      {/* Floor — high quality with roughness variation */}
      <mesh userData={{ paintKey: "floor" }} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={config.floor} roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Back wall */}
      <mesh userData={{ paintKey: "wall" }} position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color={config.wall} roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh userData={{ paintKey: "wall" }} position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color={config.wall} roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh userData={{ paintKey: "wall" }} position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color={config.wall} roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh userData={{ paintKey: "ceiling" }} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={config.ceiling} roughness={0.95} />
      </mesh>

      {/* Window on back wall */}
      <mesh position={[1.5, 3.2, -4.95]}>
        <planeGeometry args={[2.5, 2]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.15} />
      </mesh>
      {/* Window frame */}
      <mesh position={[1.5, 3.2, -4.94]}>
        <boxGeometry args={[2.6, 2.1, 0.05]} />
        <meshStandardMaterial color={config.accent} transparent opacity={0.4} />
      </mesh>
      {/* Window cross bars */}
      <mesh position={[1.5, 3.2, -4.93]}>
        <boxGeometry args={[0.03, 2.0, 0.03]} />
        <meshStandardMaterial color={config.accent} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[1.5, 3.2, -4.93]}>
        <boxGeometry args={[2.5, 0.03, 0.03]} />
        <meshStandardMaterial color={config.accent} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Window light beam */}
      <pointLight position={[1.5, 3.5, -3]} color="#FFFFFF" intensity={0.8} distance={8} castShadow />

      {/* Sofa */}
      <Float speed={1} floatIntensity={0.05} rotationIntensity={0}>
        <group position={[-1.5, 0.45, -2]}>
          <mesh userData={{ paintKey: "furniture" }} position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 0.5, 1.2]} />
            <meshStandardMaterial color={config.furniture} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.5, -0.55]} castShadow>
            <boxGeometry args={[3, 0.8, 0.15]} />
            <meshStandardMaterial color={config.furniture} roughness={0.7} />
          </mesh>
          <mesh position={[-1.4, 0.25, 0]} castShadow>
            <boxGeometry args={[0.2, 0.7, 1.2]} />
            <meshStandardMaterial color={config.furniture} roughness={0.7} />
          </mesh>
          <mesh position={[1.4, 0.25, 0]} castShadow>
            <boxGeometry args={[0.2, 0.7, 1.2]} />
            <meshStandardMaterial color={config.furniture} roughness={0.7} />
          </mesh>
          {/* Cushions */}
          <mesh position={[-0.5, 0.55, 0.1]}>
            <boxGeometry args={[0.6, 0.5, 0.3]} />
            <meshStandardMaterial color={config.accent} roughness={0.8} />
          </mesh>
          <mesh position={[0.5, 0.55, 0.1]}>
            <boxGeometry args={[0.6, 0.5, 0.3]} />
            <meshStandardMaterial color={config.accent} roughness={0.8} />
          </mesh>
        </group>
      </Float>

      {/* Coffee table */}
      <mesh userData={{ paintKey: "furniture" }} position={[0.5, 0.35, -1]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.7]} />
        <meshStandardMaterial color={config.furniture} roughness={0.5} metalness={0.3} />
      </mesh>
      {[[-0.5, -0.25], [0.5, -0.25], [-0.5, 0.25], [0.5, 0.25]].map(([x, z], i) => (
        <mesh key={i} position={[0.5 + x * 0.45, 0.17, -1 + z * 0.25]}>
          <cylinderGeometry args={[0.03, 0.03, 0.35]} />
          <meshStandardMaterial color={config.accent} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Rug */}
      <mesh userData={{ paintKey: "rug" }} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -1.5]}>
        <circleGeometry args={[2, 64]} />
        <meshStandardMaterial color={config.rug} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, -1.5]}>
        <ringGeometry args={[1.5, 2, 64]} />
        <meshStandardMaterial color={config.accent} roughness={0.95} transparent opacity={0.5} />
      </mesh>

      {/* Bookshelf on left wall */}
      <group position={[-4.9, 2, -1]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 2.5, 1.5]} />
          <meshStandardMaterial color={config.furniture} roughness={0.6} />
        </mesh>
        {[0.6, 0.2, -0.3].map((y, i) => (
          <group key={i} position={[0.08, y, 0]}>
            <mesh>
              <boxGeometry args={[0.3, 0.25, 0.18]} />
              <meshStandardMaterial color={i === 0 ? config.accent : config.rug} roughness={0.8} />
            </mesh>
            <mesh position={[0.28, 0, 0]}>
              <boxGeometry args={[0.25, 0.2, 0.16]} />
              <meshStandardMaterial color={i === 1 ? config.accent : config.furniture} roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Wall art */}
      <Float speed={0.5} floatIntensity={0.03}>
        <group position={[3, 3.2, -4.9]}>
          <mesh>
            <boxGeometry args={[1.2, 0.8, 0.05]} />
            <meshStandardMaterial color={config.accent} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[1.0, 0.6, 0.01]} />
            <meshStandardMaterial color={config.wall} roughness={0.9} />
          </mesh>
        </group>
      </Float>

      {/* Lamp */}
      <group position={[3.2, 0, -3.5]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 1.8]} />
          <meshStandardMaterial color={config.accent} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.04]} />
          <meshStandardMaterial color={config.accent} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <coneGeometry args={[0.25, 0.15, 32, 1, true]} />
          <meshStandardMaterial color={config.light} roughness={0.9} side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
        <pointLight position={[0, 0.8, 0]} color={config.light} intensity={0.6} distance={4} />
      </group>

      {/* Plant */}
      <Float speed={0.8} floatIntensity={0.1}>
        <group position={[-3.5, 0, -3.5]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.12, 0.6, 16]} />
            <meshStandardMaterial color="#8B4513" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.05, 16]} />
            <meshStandardMaterial color="#3E2723" roughness={1} />
          </mesh>
          {[0, 0.8, 0.5, -0.3, -0.6].map((angle, i) => (
            <mesh key={i} position={[Math.sin(angle) * 0.15, 0.85 + i * 0.05, Math.cos(angle) * 0.15]} rotation={[0.2 * (i - 2), 0, angle]}>
              <planeGeometry args={[0.2, 0.3]} />
              <meshStandardMaterial color="#4CAF50" roughness={0.9} side={THREE.DoubleSide} transparent opacity={0.9} />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Side table with vase */}
      <group position={[-3, 0, -2]}>
        <mesh userData={{ paintKey: "furniture" }} position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.04]} />
          <meshStandardMaterial color={config.furniture} roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.0]} />
          <meshStandardMaterial color={config.accent} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.2, 8]} />
          <meshStandardMaterial color={config.accent} roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* Lighting — hemisphere for natural fill + ambient + point ceiling */}
      <ambientLight intensity={0.15} />
      <hemisphereLight
        color={config.ceiling}
        groundColor={config.floor}
        intensity={0.4}
      />
      <pointLight position={[0, 4.8, 0]} color={config.light} intensity={0.3} distance={12} />

      <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </group>
  );
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#070B14]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#5B5FEF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[13px] text-[#94A3C4]">3D sahna yuklanmoqda...</p>
      </div>
    </div>
  );
}

export default function ApartmentViewer3D() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeStyle, setActiveStyle] = useState<StyleKey>("modern");

  const currentStyle = styleDetails[activeStyle];

  // Direct style change — no flash/overlay, smooth lerp handles transition
  const handleStyleChange = useCallback((key: StyleKey) => {
    setActiveStyle(key);
  }, []);

  return (
    <section ref={ref} id="viewer3d" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1625]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            3D Ko&apos;rinish &middot; Interaktiv
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Xonangizni 3D ko&apos;rishingiz mumkin
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            6 ta interyer uslubini sinab ko&apos;ring — uslub tugmalarini bosib xona real vaqtda o&apos;zgaradi.
            Sichqonchani bosib aylantiring va kattalashtiring.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {/* Style selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {styleKeys.map((key) => {
              const cfg = styleConfigs[key];
              const isActive = key === activeStyle;
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStyleChange(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#5B5FEF] text-white shadow-lg shadow-[#5B5FEF]/20"
                      : "bg-[#111E30] text-[#94A3C4] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: cfg.accent }}
                  />
                  {styleDetails[key].name}
                </motion.button>
              );
            })}
          </div>

          {/* 3D Viewer */}
          <div className="bg-[#070B14] border border-[rgba(255,255,255,0.07)] rounded-[20px] overflow-hidden">
            <div className="relative h-[350px] sm:h-[450px] lg:h-[500px]" style={{ touchAction: "none" }}>
              <Suspense fallback={<CanvasLoader />}>
                <Canvas
                  shadows
                  camera={{ position: [6, 5, 8], fov: 45 }}
                  gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                  style={{ background: "#070B14" }}
                >
                  <Room activeStyle={activeStyle} />
                  <OrbitControls
                    enablePan={false}
                    minDistance={5}
                    maxDistance={18}
                    minPolarAngle={Math.PI * 0.1}
                    maxPolarAngle={Math.PI * 0.5}
                    target={[0, 1.5, -1]}
                  />
                  <Environment preset="apartment" />
                </Canvas>
              </Suspense>

              {/* Controls hint */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm pointer-events-none">
                <Maximize2 className="w-3 h-3 text-[#94A3C4]" />
                <span className="text-[10px] text-[#94A3C4]">Sichqoncha bilan aylantiring</span>
              </div>

              {/* Reset button */}
              <button
                onClick={() => setActiveStyle("modern")}
                className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center text-[#94A3C4] hover:text-[#EEF2FF] transition-colors"
                aria-label="Kamerani qayta o'rnatish"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Info overlay */}
            <div className="border-t border-[rgba(255,255,255,0.07)] p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Box className="w-4 h-4 text-[#5B5FEF]" />
                    <h4 className="text-[14px] font-semibold text-[#EEF2FF]">
                      {currentStyle.name} uslubi
                    </h4>
                  </div>
                  <p className="text-[12px] text-[#94A3C4] leading-relaxed mb-3">
                    {currentStyle.description}
                  </p>
                  <div className="flex gap-2">
                    {currentStyle.colors.map((c) => (
                      <div key={c.hex} className="flex items-center gap-1.5">
                        <div
                          className="w-4 h-4 rounded-full border border-[rgba(255,255,255,0.1)]"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[9px] text-[#4A5A7A] hidden sm:inline">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div className="sm:min-w-[180px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-3.5 h-3.5 text-[#94A3C4]" />
                    <span className="text-[11px] text-[#4A5A7A] uppercase tracking-[0.5px]">Materiallar</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStyle.materials.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-[#111E30] text-[#94A3C4] border border-[rgba(255,255,255,0.05)]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
