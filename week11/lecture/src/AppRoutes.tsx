import { Route, Routes, Navigate } from "react-router-dom"
import { CubeContainer } from "./components/Cube/CubeContainer"
import { PyramidContainer } from "./components/Pyramid/PyramidContainer"

const DEFAULT_ROUTE = "/cube"
export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={DEFAULT_ROUTE} />} />
      <Route path="/cube" element={<CubeContainer />} />
      <Route path="/pyramid" element={<PyramidContainer />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}