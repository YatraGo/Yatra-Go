import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Airplane = () => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Orbit around the globe
            const t = state.clock.elapsedTime * 0.5;
            groupRef.current.position.x = Math.cos(t) * 4;
            groupRef.current.position.z = Math.sin(t) * 4;
            groupRef.current.position.y = Math.sin(t * 2) * 1.5;

            // Look forward along the path
            groupRef.current.rotation.y = -t + Math.PI;
            groupRef.current.rotation.z = Math.sin(t * 2) * 0.2; // slight bank
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
                <group scale={0.2} rotation={[0, -Math.PI / 2, 0]}>
                    {/* Fuselage */}
                    <mesh position={[0, 0, 0]}>
                        <capsuleGeometry args={[0.4, 2, 16, 16]} rotation={[0, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
                    </mesh>

                    {/* Wings */}
                    <mesh position={[0.2, 0, 0]}>
                        <boxGeometry args={[1, 0.05, 3]} />
                        <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
                    </mesh>

                    {/* Tail */}
                    <mesh position={[-1, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
                        <boxGeometry args={[0.6, 0.05, 0.8]} />
                        <meshStandardMaterial color="#FFB300" roughness={0.3} />
                    </mesh>

                    {/* Cockpit */}
                    <mesh position={[0.6, 0.2, 0]}>
                        <boxGeometry args={[0.5, 0.3, 0.4]} />
                        <meshStandardMaterial color="#0A192F" roughness={0.1} metalness={0.8} />
                    </mesh>
                </group>
            </Float>
        </group>
    );
};

export default Airplane;
