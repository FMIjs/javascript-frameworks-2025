import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_PYRAMID_FACE_SIDE, DEFAULT_PYRAMID_FACES } from "../constants";
import { PyramidFace, PyramidFaces, PyramidFaceSide } from "../types";

const getInitialFaces = (): PyramidFaces => {
  const storedFaces = localStorage.getItem('pyramid-faces')
  if (storedFaces) {
    try {
      return JSON.parse(storedFaces)
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error)
    }
  }
  return DEFAULT_PYRAMID_FACES
}

const faces = getInitialFaces();

export interface PyramidState {
  faces: PyramidFaces;
  currentFace?: PyramidFace;
  side: PyramidFaceSide
}

const initialState: PyramidState = {
  faces,
  currentFace: faces[DEFAULT_PYRAMID_FACE_SIDE],
  side: DEFAULT_PYRAMID_FACE_SIDE
}

const pyramidSlice = createSlice({
  name: 'pyramid',
  initialState,
  reducers: {
    setFace: (state, action) => {
      const { side, face } = action.payload as { side: PyramidFaceSide, face: PyramidFace };
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
      const { side } = action.payload as { side: PyramidFaceSide };

      return {
        ...state,
        side,
        currentFace: state.faces[side]
      }
    },
    // utils
    storeData: (state) => {
      const { faces } = state
      localStorage.setItem('pyramid-faces', JSON.stringify(faces))
    }
  }
})

export const { setFace, setSide, storeData } = pyramidSlice.actions;
export default pyramidSlice.reducer;