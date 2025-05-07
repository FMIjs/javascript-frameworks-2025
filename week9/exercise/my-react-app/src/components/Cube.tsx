import { useCallback, useMemo, useState } from 'react'
import './Cube.css'
import Color from 'color'

export type CubeFace = {
  text?: string,
  color?: string,
}

export type FaceSide = 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom'

type CubeFaceProps = {
  cubeFace?: CubeFace,
  side: FaceSide,
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

const defaultStartPos = { x: 0, y: 0 }
export type CubeProps = {
  [face in FaceSide]?: CubeFace;
}
export const Cube = (props: CubeProps) => {
  const { front, back, right, left, top, bottom } = props

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
      className="cube-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
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

