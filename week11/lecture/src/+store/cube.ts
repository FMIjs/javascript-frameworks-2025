import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT_CUBE_FACE_SIDE } from "../constants";
import { CubeFace, CubeFaces, CubeFaceSide } from "../types";

// const getInitialFaces = (): CubeFaces => {
//   const storedFaces = localStorage.getItem('cube-faces')
//   if (storedFaces) {
//     try {
//       return JSON.parse(storedFaces)
//     } catch (error) {
//       console.error('Error parsing JSON from localStorage:', error)
//     }
//   }
//   return DEFAULT_CUBE_FACES
// }

// const faces: CubeFaces = getInitialFaces();

export interface CubeState {
  faces: CubeFaces;
  currentFace?: CubeFace;
  side: CubeFaceSide;

  loading: boolean | null;
  error: string | null;
}

const initialState: CubeState = {
  faces: {},
  currentFace: undefined,
  side: DEFAULT_CUBE_FACE_SIDE,
  loading: null,
  error: null
}


export const fetchCube = createAsyncThunk(
  'cube/fetchCube',
  async (_, extra) => {

    // setTimeout(() => {
    //   extra.abort();
    // })
    const response = await fetch('http://localhost:3000/cube', { signal: extra.signal })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    extra.dispatch(cubeSlice.actions.saveData(data))
  }
);

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
    saveData: (state, action) => {
      const { faces } = action.payload as { faces: CubeFaces };
      return {
        ...state,
        faces
      }
    },
    // utils
    storeData: (state) => {
      const { faces } = state
      localStorage.setItem('cube-faces', JSON.stringify(faces))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCube.pending, (state) => {
        // console.log("fetchCube.pending")
        state.loading = true
        state.error = null
      })
      .addCase(fetchCube.fulfilled, (state, action) => {
        // console.log("fetchCube.fulfilled")
        state.loading = false
        // state.faces = action.payload
        state.error = null
      })
      .addCase(fetchCube.rejected, (state, action) => {
        // console.log("fetchCube.rejected")
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
  }
})

export const { setFace, setSide, storeData, saveData } = cubeSlice.actions;
export default cubeSlice.reducer;