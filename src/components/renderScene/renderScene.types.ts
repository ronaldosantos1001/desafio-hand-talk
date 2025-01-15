export type Object3DProps = {
  type: 'cube' | 'cone' | 'dodecahedron';
  color: string;
  rotation: { x: number; y: number; z: number };
};

export type RenderSceneProps = {
  objects: Object3DProps[];
};
