
import express, { Request, Response } from "express";
import cors from "cors";
import { CubeFaces, CubeFaceSide } from "./types/cube";
import { PyramidFaces, PyramidFaceSide } from "./types/pyramid";

export const DEFAULT_CUBE_FACE_SIDE: CubeFaceSide = 'front'
export const DEFAULT_CUBE_FACES: CubeFaces = {
  [DEFAULT_CUBE_FACE_SIDE]: { text: 'Front', color: 'red' },
}

export const DEFAULT_PYRAMID_FACE_SIDE: PyramidFaceSide = 'sideA'
export const DEFAULT_PYRAMID_FACES: PyramidFaces = {
  [DEFAULT_PYRAMID_FACE_SIDE]: { text: 'Side A', color: 'red' },
}

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

let cubeFaces: CubeFaces = DEFAULT_CUBE_FACES;
let pyramidFaces: PyramidFaces = DEFAULT_PYRAMID_FACES;

app.get('/cube', (_: Request, res: Response) => {
  res.json({ faces: cubeFaces }).status(200);
});
app.post('/cube', (req: Request, res: Response) => {
  const { faces } = req.body as { faces: CubeFaces };
  cubeFaces = faces;
  res.status(200).json({ message: 'Cube faces updated successfully' });
})

app.get('/pyramid', (_: Request, res: Response) => {
  res.json({ faces: pyramidFaces }).status(200);
});
app.post('/pyramid', (req: Request, res: Response) => {
  const { faces } = req.body as { faces: PyramidFaces };
  pyramidFaces = faces;
  res.status(200).json({ message: 'Pyramid faces updated successfully' });
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


