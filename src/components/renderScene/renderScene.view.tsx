import React, { useEffect, useRef } from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { PerspectiveCamera, Scene, Mesh, MeshBasicMaterial } from 'three';
import { BoxGeometry, ConeGeometry, DodecahedronGeometry } from 'three';
import { RenderSceneProps } from './renderScene.types';



const RenderScene: React.FC<RenderSceneProps> = ({ objects }) => {
  const sceneRef = useRef<Scene>(new Scene());
  const meshesRef = useRef<Mesh[]>([]);
  const rendererRef = useRef<Renderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);

  const onContextCreate = async (gl: any) => {
    // Configura o renderizador
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    rendererRef.current = renderer;

    // Configura a câmera
    const camera = new PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Loop de animação
    const animate = () => {
      requestAnimationFrame(animate);

      // Atualiza rotação dos objetos em tempo real
      meshesRef.current.forEach((mesh, index) => {
        const objRotation = objects[index]?.rotation;
        if (mesh && objRotation) {
          mesh.rotation.x += objRotation.x * 0.01;
          mesh.rotation.y += objRotation.y * 0.01;
          mesh.rotation.z += objRotation.z * 0.01;
        }
      });

      renderer.render(sceneRef.current, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  // Sincroniza objetos com as props
  useEffect(() => {
    const scene = sceneRef.current;

    // Limpa objetos antigos
    meshesRef.current.forEach((mesh) => scene.remove(mesh));
    meshesRef.current = [];

    // Determina a posição inicial para centralizar os objetos
    const offset = objects.length > 1 ? (objects.length - 1) / 2 : 0;

    // Adiciona novos objetos
    objects.forEach((obj, index) => {
      const geometry =
        obj.type === 'cube'
          ? new BoxGeometry(1, 1, 1)
          : obj.type === 'cone'
          ? new ConeGeometry(0.5, 1, 32)
          : new DodecahedronGeometry(0.7);

      const material = new MeshBasicMaterial({ color: obj.color });
      const mesh = new Mesh(geometry, material);

      // Posiciona objetos verticalmente centralizados
      mesh.position.y = -(index - offset) * 2;

      // Define a rotação inicial
      mesh.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z);

      meshesRef.current.push(mesh);
      scene.add(mesh);
    });
  }, [objects]);

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
};

export default RenderScene;
