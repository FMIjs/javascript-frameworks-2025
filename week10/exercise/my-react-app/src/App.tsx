import { useCallback, useEffect, useMemo, useState } from 'react'
import { Cube, CubeFace, CubeProps, FaceSide } from './components/Cube'
import './App.css'

const DEFAULT_FACE_SIDE: FaceSide = 'front'
const DEFAULT_FACES: CubeProps = {
  front: { text: 'Front', color: 'red' },
}

function App() {
  // useMemo      ==> memoized variable
  // useCallback  ==> memoized function
  // useEffect    ==> side effect

  // useX(() => { ... }, [dependencies])
  // no dependencies ==> run on every render
  // empty array ==> run only once (on mount)
  // dependencies array ==> run when dependencies change

  // useState ==> const [state, setState] ==> state variable and function to update it
  // state.push()

  const defaultFaces = useMemo(() => {
    const storedFaces = localStorage.getItem('cube-faces')
    if (storedFaces) {
      try {
        return JSON.parse(storedFaces)
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error)
      }
    }
    return DEFAULT_FACES
  }, [])

  const [faces, setFaces] = useState<CubeProps>(defaultFaces)

  const [faceSide, setFaceSide] = useState<FaceSide>(DEFAULT_FACE_SIDE)
  const [text, setText] = useState(defaultFaces[DEFAULT_FACE_SIDE]?.text || '')
  const [color, setColor] = useState(defaultFaces[DEFAULT_FACE_SIDE]?.color || '')

  const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO Add debounce?
    // ! 0.3s
    // ! x - - - | ==> [x]
    // ! x - - y - - - | ==> [y]
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
    const face: CubeFace = {
      text,
      color,
    }
    setFaces({ ...faces, [faceSide]: face })
    // setFaces((prevFaces) => ({
    //   ...prevFaces,
    //   [faceSide]: face,
    // }))
  }, [color, faceSide, faces, text])

  useEffect(() => {
    const face = faces[faceSide]
    setText(face?.text || '')
    setColor(face?.color || '')
  }, [faceSide, faces])


  useEffect(() => {
    localStorage.setItem('cube-faces', JSON.stringify(faces))
  }, [faces])

  return (
    <div id="app-container">
      <div id="face-form">
        <label htmlFor="face">Face</label>
        <select name="face" onChange={(e) => setFaceSide(e.target.value as FaceSide)}>
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
      <Cube {...faces} />
    </div>
  )
}

export default App
