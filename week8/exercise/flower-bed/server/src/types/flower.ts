import { ColorType } from "./color-type";

export type IFlower = {
  id: string;
  waterLevel: number;
  color : ColorType;
};

export type IFlowerDTO = Omit<IFlower, 'id'>
