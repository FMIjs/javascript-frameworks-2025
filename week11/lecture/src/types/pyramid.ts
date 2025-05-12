export type PyramidFace = {
  text?: string,
  color?: string,
}

export type PyramidFaceSide = 'base' | 'sideA' | 'sideB' | 'sideC' | 'sideD';

export type PyramidFaces = {
  [face in PyramidFaceSide]?: PyramidFace;
}