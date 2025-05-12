import { useCallback, useMemo, useState } from 'react'

import { PyramidFace as PyramidFaceType, PyramidFaceSide } from '../../types'

import './Pyramid.css'
import Color from 'color'
import { RootState } from '../../+store'
import { useSelector } from 'react-redux'

type PyramidFaceProps = {
  pyramidFace?: PyramidFaceType,
  side: PyramidFaceSide,
}
export const PyramidFace = ({ pyramidFace, side }: PyramidFaceProps) => {
  const faceClassName = useMemo(() => `face ${side}${side === 'base' ? '' : ' triangle'}`, [side])
  const rawColor = useMemo(() => pyramidFace?.color || 'rgba(0, 123, 255, 0.7)', [pyramidFace?.color])
  const color = useMemo(() => {
    try {

      const color = Color(rawColor.toLowerCase());
      return color.alpha(0.7).toString();
    } catch (error) {
      console.error('Invalid color:', rawColor, error);
      return rawColor;
    }
  }, [rawColor])

  const text = useMemo(() => pyramidFace?.text || 'x', [pyramidFace?.text])


  const style = useMemo(() => {
    if (side === 'base') return { backgroundColor: color }
    return {
      borderBottomColor: color
    }
  }, [color, side])

  return (
    <div className={faceClassName} style={style}>
      <span>{text}</span>
    </div>
  )
}

const defaultStartPos = { x: 0, y: 0 }
export const Pyramid = () => {
  const { base, sideA, sideB, sideC, sideD } = useSelector((state: RootState) => state.pyramid.faces)

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

  return (
    <div
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      className="pyramid-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pyramid"
        style={{ transform }}
      >
        <PyramidFace pyramidFace={base} side="base" />
        <PyramidFace pyramidFace={sideA} side="sideA" />
        <PyramidFace pyramidFace={sideB} side="sideB" />
        <PyramidFace pyramidFace={sideC} side="sideC" />
        <PyramidFace pyramidFace={sideD} side="sideD" />
      </div>
    </div>
  )
}

