import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CUBE_FACE_SIDE, DEFAULT_CUBE_FACES } from "../constants";
import { CubeFace, CubeFaces, CubeFaceSide } from "../types";

const getInitialFaces = (): CubeFaces => {
  const storedFaces = localStorage.getItem('cube-faces')
  if (storedFaces) {
    try {
      return JSON.parse(storedFaces)
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error)
    }
  }
  return DEFAULT_CUBE_FACES
}

const faces = getInitialFaces();

export interface CubeState {
  faces: CubeFaces;
  currentFace?: CubeFace;
  side: CubeFaceSide
}

const initialState: CubeState = {
  faces,
  currentFace: faces[DEFAULT_CUBE_FACE_SIDE],
  side: DEFAULT_CUBE_FACE_SIDE
}

const cubeSlice = createSlice({
  name: 'cube',
  initialState,
  reducers: {
    setFace: (state, action) => {
      const { side, face } = action.payload as { side: CubeFaceSide, face: CubeFace };
      const faces = {
        ...state.faces,
        [side]: face
      }
      return {
        ...state,
        faces,
        currentFace: faces[side]
      }
    },
    setSide: (state, action) => {
      const { side } = action.payload as { side: CubeFaceSide };

      return {
        ...state,
        side,
        currentFace: state.faces[side]
      }
    },
    // utils
    storeData: (state) => {
      const { faces } = state
      localStorage.setItem('cube-faces', JSON.stringify(faces))
    }
  }
})

export const { setFace, setSide, storeData } = cubeSlice.actions;
export default cubeSlice.reducer;