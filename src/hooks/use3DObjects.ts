import { useEffect, useRef } from 'react';
import * as THREE from 'three';


interface Object3D {
  type: 'cone' | 'cube' | 'dodecahedron';
  color: string;
  rotation: [number, number, number];
}

export function use3DObjects(container: React.RefObject<HTMLDivElement>, objects: Object3D[]) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.current.clientWidth / container.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.current.clientWidth, container.current.clientHeight);
    container.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      container.current?.removeChild(renderer.domElement);
    };
  }, [container]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    objects.forEach((obj) => {
      let geometry;
      switch (obj.type) {
        case 'cone':
          geometry = new THREE.ConeGeometry(1, 2, 32);
          break;
        case 'cube':
          geometry = new THREE.BoxGeometry();
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry();
          break;
        default:
          return;
      }

      const material = new THREE.MeshStandardMaterial({ color: obj.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(...obj.rotation);
      scene.add(mesh);
    });

    return () => {
      objects.forEach(() => {
        scene.clear();
      });
    };
  }, [objects]);
}
