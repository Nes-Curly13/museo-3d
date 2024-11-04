"use client"

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ModelViewerProps {
  modelUrl: string;
  modelType: 'glb' | 'gltf';
}

export default function ModelViewer({ modelUrl, modelType }: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentRef = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentRef.clientWidth / currentRef.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        scene.add(gltf.scene);
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        gltf.scene.scale.multiplyScalar(scale);
        
        gltf.scene.position.sub(center.multiplyScalar(scale));
        
        camera.position.set(0, 0, 5);
        controls.update();
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the model:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentRef.removeChild(renderer.domElement);
    };
  }, [modelUrl, modelType]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
