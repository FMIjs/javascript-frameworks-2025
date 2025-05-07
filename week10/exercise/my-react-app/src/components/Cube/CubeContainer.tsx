import { Cube } from './Cube'
import { CubeForm } from './CubeForm';

import './CubeContainer.css'

export const CubeContainer = () => {
  return (
    <div id="cube-container">
      <CubeForm />
      <Cube />
    </div>
  )
}

