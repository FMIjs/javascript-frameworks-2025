export type CubeFace = {
  text?: string,
  color?: string,
}

export type CubeFaceSide = 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom'

export type CubeFaces = {
  [face in CubeFaceSide]?: CubeFace;
}