import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import './CubeForm.css'
import { CubeFace, CubeFaceSide } from '../../types'
import { RootState } from '../../+store';
import { setFace, setSide, storeData } from '../../+store/cube';
import { useTestData } from '../../hooks/testData';
import { v4 } from 'uuid';

export const CubeForm = () => {
  const faceSide = useSelector((state: RootState) => state.cube.side)
  const face = useSelector((state: RootState) => state.cube.currentFace)

  const dispatch = useDispatch()


  // const testRef = useRef(1)
  // console.log('CubeForm', testRef.current);

  // useEffect(() => {
  //   console.log(testRef.current);
  //   testRef.current = testRef.current + 1
  // }, [])

  const [text, setText] = useState(face?.text || '')
  const [color, setColor] = useState(face?.color || '')

  const { state } = useTestData({ id: useMemo(() => v4(), []) }) // <-- also good for some reason
  useEffect(() => console.log("CubeForm", state), [state])

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

