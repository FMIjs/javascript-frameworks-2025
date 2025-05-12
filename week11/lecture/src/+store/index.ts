import { configureStore } from "@reduxjs/toolkit";

import cubeReducer from "./cube";
import pyramidReducer from "./pyramid";

export const store = configureStore({
  reducer: {
    cube: cubeReducer,
    pyramid: pyramidReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;