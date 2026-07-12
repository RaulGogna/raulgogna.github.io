import { useRef, useMemo, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Scene3DProps {
  scrollRef: MutableRefObject<number>
  mouseRef: MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}

/* ── Ceramic shapes config ───────────────────────── */
type ShapeKind =
  | 'icosahedron'
  | 'torus'
  | 'capsule'
  | 'sphere'
  | 'cone'
  | 'cylinder3'

interface ShapeConfig {
  kind: ShapeKind
  pos: [number, number, number]
  color: string
  fy: number
  speed: number
}

const SHAPES: ShapeConfig[] = [
  { kind: 'icosahedron', pos: [-2.8, 1.2, 0],    color: '#D8CBB2', fy: 0.22, speed: 0.32 },
  { kind: 'torus',       pos: [2.6,  -0.6, -0.5], color: '#E9E2D2', fy: 0.18, speed: 0.40 },
  { kind: 'capsule',     pos: [-0.8, -1.6, 0.4],  color: '#C8BEA8', fy: 0.25, speed: 0.27 },
  { kind: 'sphere',      pos: [1.3,  1.9, -0.3],  color: '#D4C8B2', fy: 0.16, speed: 0.36 },
  { kind: 'cone',        pos: [3.4,  0.7, 0],     color: '#BFB49C', fy: 0.28, speed: 0.44 },
  { kind: 'cylinder3',   pos: [-3.1, -1.3, -0.4], color: '#E2D9C6', fy: 0.20, speed: 0.38 },
]

/* ── Single floating shape ────────────────────────── */
function FloatingShape({
  cfg,
  phase,
  reduced,
}: {
  cfg: ShapeConfig
  phase: number
  reduced: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  const baseY = cfg.pos[1]

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh || reduced) return
    const t = clock.getElapsedTime()
    mesh.position.y = baseY + Math.sin(t * cfg.speed + phase) * cfg.fy
    mesh.rotation.x += 0.0025
    mesh.rotation.y += 0.004 + phase * 0.0005
  })

  const mat = (
    <meshStandardMaterial
      color={cfg.color}
      roughness={0.88}
      metalness={0}
    />
  )

  return (
    <mesh ref={ref} position={cfg.pos}>
      {cfg.kind === 'icosahedron' && <icosahedronGeometry args={[0.9, 0]} />}
      {cfg.kind === 'torus' && <torusGeometry args={[0.62, 0.24, 16, 32]} />}
      {cfg.kind === 'capsule' && <capsuleGeometry args={[0.4, 0.55, 6, 12]} />}
      {cfg.kind === 'sphere' && <sphereGeometry args={[0.72, 32, 32]} />}
      {cfg.kind === 'cone' && <coneGeometry args={[0.52, 1.15, 3, 1]} />}
      {cfg.kind === 'cylinder3' && <cylinderGeometry args={[0.48, 0.48, 0.75, 3]} />}
      {mat}
    </mesh>
  )
}

/* ── Constellation (dots + lines) ────────────────── */
function Constellation() {
  const { ptPos, linePos } = useMemo(() => {
    const count = 32
    const raw: number[] = []
    for (let i = 0; i < count; i++) {
      raw.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14,
        -(Math.random() * 4 + 2)
      )
    }

    const lines: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = raw[i * 3] - raw[j * 3]
        const dy = raw[i * 3 + 1] - raw[j * 3 + 1]
        if (Math.hypot(dx, dy) < 5) {
          lines.push(
            raw[i * 3], raw[i * 3 + 1], raw[i * 3 + 2],
            raw[j * 3], raw[j * 3 + 1], raw[j * 3 + 2]
          )
        }
      }
    }

    return {
      ptPos: new Float32Array(raw),
      linePos: new Float32Array(lines),
    }
  }, [])

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ptPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#7A7668"
          transparent
          opacity={0.35}
        />
      </points>
      {linePos.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePos, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7A7668" transparent opacity={0.12} />
        </lineSegments>
      )}
    </>
  )
}

/* ── Inner scene (must be inside Canvas) ─────────── */
function SceneContent({
  scrollRef,
  mouseRef,
  reducedMotion,
}: Scene3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const group = groupRef.current
    if (!group || reducedMotion) return
    const scroll = scrollRef.current
    const mouse = mouseRef.current
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      scroll * Math.PI * 1.6 + mouse.x * 0.12,
      0.025
    )
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      scroll * Math.PI * 0.4 + mouse.y * 0.07,
      0.025
    )
  })

  return (
    <>
      <color attach="background" args={['#F4F1E9']} />
      <fog attach="fog" args={['#F4F1E9', 10, 28]} />
      <ambientLight intensity={0.55} color="#FFF8F0" />
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.25}
        color="#FFF3DC"
      />

      <group ref={groupRef}>
        {SHAPES.map((cfg, i) => (
          <FloatingShape
            key={cfg.kind + String(i)}
            cfg={cfg}
            phase={(i * Math.PI * 2) / SHAPES.length}
            reduced={reducedMotion}
          />
        ))}
      </group>

      <Constellation />
    </>
  )
}

/* ── Exported component ───────────────────────────── */
export default function Scene3D({
  scrollRef,
  mouseRef,
  reducedMotion,
}: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.75]}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      <SceneContent
        scrollRef={scrollRef}
        mouseRef={mouseRef}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  )
}
