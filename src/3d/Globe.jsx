import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

const Globe = () => {
    const globeRef = useRef();

    useFrame((state, delta) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += delta * 0.1;
            globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
        >
            <group ref={globeRef}>
                {/* Core Globe */}
                <Sphere args={[2.5, 64, 64]}>
                    <MeshDistortMaterial
                        color="#0A192F"
                        attach="material"
                        distort={0.4}
                        speed={1.5}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe={true}
                    />
                </Sphere>

                {/* Inner Solid Globe for better visibility */}
                <Sphere args={[2.4, 32, 32]}>
                    <meshStandardMaterial color="#0A192F" roughness={0.5} />
                </Sphere>

                {/* Decorative Rings or Satellites */}
                <mesh rotation-x={Math.PI / 2}>
                    <ringGeometry args={[3.2, 3.22, 64]} />
                    <meshBasicMaterial color="#FFB300" opacity={0.5} transparent side={2} />
                </mesh>

                <mesh rotation-x={1.2} rotation-y={0.5}>
                    <ringGeometry args={[3.8, 3.82, 64]} />
                    <meshBasicMaterial color="#059669" opacity={0.3} transparent side={2} />
                </mesh>
            </group>
        </Float>
    );
};

export default Globe;
