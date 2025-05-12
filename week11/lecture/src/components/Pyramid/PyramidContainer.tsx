import { Pyramid } from './Pyramid'
import { PyramidForm } from './PyramidForm';

import './PyramidContainer.css'

export const PyramidContainer = () => {
  return (
    <div id="pyramid-container">
      <PyramidForm />
      <Pyramid />
    </div>
  )
}

