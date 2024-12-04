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
    const camera = new THREE.PerspectiveCamera(75, currentRef.clientWidth / currentRef.clientHeight, 0.5, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });



    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;


//Ilumination
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    // White directional light at half intensity shining from the top.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    
    scene.add(directionalLight);

    const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    scene.add( light );
//Ilumination
    
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        console.log(gltf)
        scene.add(gltf.scene);

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        gltf.scene.scale.multiplyScalar(scale);

        gltf.scene.position.sub(center.multiplyScalar(scale));

        camera.position.set(0, 0, 5);
        controls.update();

        // Plane for the base of object
        const geometry = new THREE.PlaneGeometry(maxDim * scale * 4, maxDim * scale * 4);
        const material = new THREE.MeshBasicMaterial({
          color: 0x8C8C8E,
          side: THREE.DoubleSide,

          opacity: 0.2,
          transparent: true,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -maxDim * scale / 2

        scene.add(plane);
        // Plane for the base of object
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
//limpiador de los eventos para no sobrecargar el navegador
    return () => {
      window.removeEventListener('resize', handleResize);
      currentRef.removeChild(renderer.domElement);
    };
//limpiador de los eventos para no sobrecargar el navegador    
  }, [modelUrl, modelType]);// parámetros que al cambiar ejecutan de nuevo el useEffect

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
