import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import './PyramidForm.css'
import { PyramidFace, PyramidFaceSide } from '../../types'
import { RootState } from '../../+store';
import { setFace, setSide, storeData } from '../../+store/pyramid';

export const PyramidForm = () => {
  const faceSide = useSelector((state: RootState) => state.pyramid.side)
  const face = useSelector((state: RootState) => state.pyramid.currentFace)

  const dispatch = useDispatch()

  const [text, setText] = useState(face?.text || '')
  const [color, setColor] = useState(face?.color || '')

  const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'text':
        setText(value)
        break
      case 'color':
        setColor(value)
        break
      default:
        console.log('Unknown input name')
        break
    }
  }, [])

  const saveFace = useCallback(() => {
    const face: PyramidFace = { text, color };
    dispatch(setFace({ side: faceSide, face }));
    dispatch(storeData());
  }, [color, faceSide, text, dispatch])

  const setFaceSide = useCallback((side: PyramidFaceSide) => {
    dispatch(setSide({ side }))
  }, [dispatch])

  useEffect(() => {
    setText(face?.text || '')
    setColor(face?.color || '')
  }, [face])

  return (
    <div id="face-form">
      <label htmlFor="face">Face</label>
      <select name="face" value={faceSide} onChange={(e) => setFaceSide(e.target.value as PyramidFaceSide)}>
        <option value="base">Base</option>
        <option value="sideA">Side A</option>
        <option value="sideB">Side B</option>
        <option value="sideC">Side C</option>
        <option value="sideD">Side D</option>
      </select>

      <label htmlFor="text">Text</label>
      <input name="text" type="text" value={text} onChange={changeHandler} />
      <label htmlFor="color">Color</label>
      <input name="color" type="text" value={color} onChange={changeHandler} />

      <button onClick={saveFace}>Save</button>
    </div>
  )
}

