import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import './CubeForm.css'
import { CubeFace, CubeFaceSide } from '../../types'
import { RootState } from '../../+store';
import { setFace, setSide, storeData } from '../../+store/cube';

export const CubeForm = () => {
  const faceSide = useSelector((state: RootState) => state.cube.side)
  const face = useSelector((state: RootState) => state.cube.currentFace)

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
    const face: CubeFace = { text, color };
    dispatch(setFace({ side: faceSide, face }));
    dispatch(storeData());
  }, [color, faceSide, text, dispatch])

  const setFaceSide = useCallback((side: CubeFaceSide) => {
    dispatch(setSide({ side }))
  }, [dispatch])

  useEffect(() => {
    setText(face?.text || '')
    setColor(face?.color || '')
  }, [face])

  return (
    <div id="face-form">
      <label htmlFor="face">Face</label>
      <select name="face" onChange={(e) => setFaceSide(e.target.value as CubeFaceSide)}>
        <option value="front">Front</option>
        <option value="back">Back</option>
        <option value="right">Right</option>
        <option value="left">Left</option>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
      </select>

      <label htmlFor="text">Text</label>
      <input name="text" type="text" value={text} onChange={changeHandler} />
      <label htmlFor="color">Color</label>
      <input name="color" type="text" value={color} onChange={changeHandler} />

      <button onClick={saveFace}>Save</button>
    </div>
  )
}

