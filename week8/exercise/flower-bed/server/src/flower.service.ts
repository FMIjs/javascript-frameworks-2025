import { v4 } from "uuid";
import { IFlower, IFlowerDTO } from "./types/flower";
import { ColorType } from "./types/color-type";

const flowers: IFlower[] = []

const DEFAULT_FLOWER_COUNT = 5;
const DEFAULT_FLOWER_DATA: IFlowerDTO = {
  waterLevel: 2,
  color: ColorType.BROWN
}

export const getFlowers = () => flowers;
export const getFlowerById = (id: IFlower['id']) => flowers.find(flower => flower.id === id);

export const createFlower = (flowerData: IFlowerDTO) => {
  console.log('createFlower', flowerData);
  const flower: IFlower = {
    id: v4(),
    ...flowerData
  }

  flowers.push(flower);
  return flower;
}

export const seedFlowers = () => {
  new Array(DEFAULT_FLOWER_COUNT)
    .fill(DEFAULT_FLOWER_DATA)
    .map(createFlower);

  return flowers;
}


const trimFlower = (idx: number, trimLevel = 2) => {
  const flower = flowers[idx];
  const waterLevel = Math.max(flower.waterLevel - trimLevel, 0)
  flowers[idx] = { ...flower, waterLevel };

  return flowers[idx];
}

export const trimFlowers = () => {
  return flowers.map((_, idx) => idx).map(trimFlower);
}

export const updateFlower = (id: IFlower['id'], flowerData: Partial<IFlower>) => {
  const flowerIndex = flowers.findIndex(flower => flower.id === id);
  if (flowerIndex === -1) {
    throw new Error(`Flower with id ${id} not found`);
  }
  const flower = flowers[flowerIndex];
  const updatedFlower = { ...flower, ...flowerData };
  flowers[flowerIndex] = updatedFlower;
  return updatedFlower;
}
