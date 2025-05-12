import { CubeFaces, CubeFaceSide, PyramidFaces, PyramidFaceSide } from "../types"

export const DEFAULT_CUBE_FACE_SIDE: CubeFaceSide = 'front'
export const DEFAULT_CUBE_FACES: CubeFaces = {
  [DEFAULT_CUBE_FACE_SIDE]: { text: 'Front', color: 'red' },
}

export const DEFAULT_PYRAMID_FACE_SIDE: PyramidFaceSide = 'sideA'
export const DEFAULT_PYRAMID_FACES: PyramidFaces = {
  [DEFAULT_PYRAMID_FACE_SIDE]: { text: 'Side A', color: 'red' },
}
