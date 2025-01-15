// /src/types/configuration.ts

export type ShapeType = 'cone' | 'cube' | 'dodecahedron';

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface ObjectConfiguration {
  type: ShapeType;
  color: string;
  rotation: Rotation;
}

export interface UserConfiguration {
  cone: ObjectConfiguration;
  cube: ObjectConfiguration;
  dodecahedron: ObjectConfiguration;
}
