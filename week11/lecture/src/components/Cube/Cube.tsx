import { useCallback, useEffect, useMemo, useState } from 'react'

import { CubeFace as CubeFaceType, CubeFaceSide } from '../../types'

import './Cube.css'
import Color from 'color'
import { RootState } from '../../+store'
import { useDispatch, useSelector } from 'react-redux'
import { saveData } from '../../+store/cube'
import { ThunkDispatch } from 'redux-thunk'

// import useSWR from 'swr'
import { useFetch } from '../../hooks/fetch'
import { v4 } from 'uuid'
import { useTestData } from '../../hooks/testData'
import useSWR from 'swr'

type CubeFaceProps = {
  cubeFace?: CubeFaceType,
  side: CubeFaceSide,
}
export const CubeFace = ({ cubeFace, side }: CubeFaceProps) => {
  const faceClassName = useMemo(() => `face ${side}`, [side])
  const rawColor = useMemo(() => cubeFace?.color || 'rgba(0, 123, 255, 0.7)', [cubeFace?.color])

  const backgroundColor = useMemo(() => {
    try {

      const color = Color(rawColor.toLowerCase());
      return color.alpha(0.7).toString();
    } catch (error) {
      console.error('Invalid color:', rawColor, error);
      return rawColor;
    }
  }, [rawColor])
  const borderColor = useMemo(() => {
    try {
      const color = Color(rawColor.toLowerCase());
      return color.alpha(1).toString();
    } catch (error) {
      console.error('Invalid color:', rawColor, error);
      return rawColor;
    }
  }, [rawColor])
  const text = useMemo(() => cubeFace?.text || 'x', [cubeFace?.text])

  return (
    <div className={faceClassName} style={{ backgroundColor, borderColor }}>
      {text}
    </div>
  )
}


// const fetcher = (url: string) => fetch(url).then(res => res.json())

const defaultStartPos = { x: 0, y: 0 }
export const Cube = () => {
  // const loading = useSelector((state: RootState) => state.cube.loading)
  // const error = useSelector((state: RootState) => state.cube.error)
  const { front, back, right, left, top, bottom } = useSelector((state: RootState) => state.cube.faces)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // const isDevRerender = useRef(true)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   if (isDevRerender.current) return;

  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   setIsLoading(true)
  //   const load = async () => {
  //     const response = await fetch('http://localhost:3000/cube', { signal })
  //     setIsLoading(false)

  //     if (!response.ok) {
  //       const errorText = `Failed to fetch cube data: ${response.statusText}`
  //       console.error(errorText);
  //       setError(errorText)
  //     } else { 
  //       const cubeData = await response.json()
  //       console.log('cubeData', cubeData)
  //     }
  //   }
  //   load()

  //   return () => {
  //     controller.abort('Component unmounted, aborting fetch');
  //     setIsLoading(false)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (isDevRerender.current) return;
  //   dispatch(fetchCube())
  // }, [dispatch])

  // useEffect(() => {
  //   isDevRerender.current = false
  // }, [])

  const { loading, error, data } = useFetch({ url: 'http://localhost:3000/cube' })

  // console.log(loading, error, data)

  // const testDataId = useMemo(() => v4(), [])
  // const { state, setState } = useTestData({ id: testDataId }) // <-- good
  // const { state, setState } = useTestData({ id: v4() }) // <-- bad
  const { state, setState } = useTestData({ id: useMemo(() => v4(), []) }) // <-- also good for some reason

  useEffect(() => console.log("Cube", state), [state])

  // const {data, isLoading: loading, error, mutate } = useSWR('http://localhost:3000/cube', fetcher)

  useEffect(() => {
    if (!data || loading) return
    dispatch(saveData(data))
  }, [data, loading, dispatch])


  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState(defaultStartPos);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos({ x: event.clientX, y: event.clientY });
  }, []);
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setStartPos(defaultStartPos);
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startPos.x;
    const deltaY = event.clientY - startPos.y;

    const rotationSensitivity = 0.5;

    let newRotationX = rotation.x;
    let newRotationY = rotation.y;
    let newRotationZ = rotation.z;

    // Check if the Shift key is held down for Z-axis rotation
    if (event.shiftKey) {
      newRotationZ = rotation.z + deltaX * rotationSensitivity; // Horizontal movement controls Z rotation
    } else {
      newRotationY = rotation.y + deltaX * rotationSensitivity; // Horizontal movement controls Y rotation
      newRotationX = rotation.x - deltaY * rotationSensitivity; // Vertical movement controls X rotation
    }

    setRotation({ x: newRotationX, y: newRotationY, z: newRotationZ });
    setStartPos({ x: event.clientX, y: event.clientY });
  }, [isDragging, rotation.x, rotation.y, rotation.z, startPos.x, startPos.y]);

  const transform = useMemo(() => `rotateZ(${rotation.z}deg) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, [rotation])

  const buttonClickHandler = useCallback(() => {
    const newState = (state || 0) + 1;
    setState(newState)
  }, [setState, state])

  if (error) return <div>Error: {error}</div>
  if (loading) return <div>Loading...</div>
  return (
    <div
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      className="cube-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* <button onClick={() => mutate()}>Refresh</button> */}
      <button onClick={() => buttonClickHandler()}>Do thing</button>
      <div
        className="cube"
        style={{ transform }}
      >
        <CubeFace cubeFace={front} side="front" />
        <CubeFace cubeFace={back} side="back" />
        <CubeFace cubeFace={right} side="right" />
        <CubeFace cubeFace={left} side="left" />
        <CubeFace cubeFace={top} side="top" />
        <CubeFace cubeFace={bottom} side="bottom" />
      </div>
    </div>
  )
}

