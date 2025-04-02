import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlower } from '../types/flower';
import { v4 } from 'uuid';
import { ColorType } from '../types/color-type';

const FLOWER_SEED_COUNT = 3;
const createFlower = (): IFlower => ({
    id: v4(),
    waterLevel: 1,
    color: 'green',
})

@Injectable()
export class FlowerStorageService {
  private flowerStorage = new BehaviorSubject<IFlower[]>([
  ]);

  seedFlowers() {
    this.flowerStorage.next([
      ...Array(FLOWER_SEED_COUNT).fill(0).map(createFlower),
    ])
  }

  updateWaterLevel(id: string, waterLevel: number) {
    const flowers = this.flowerStorage.getValue();
    const flower = flowers.find(f => f.id === id);
    if(!flower){
      throw new Error('Flower not found');
    }

    const updatedFlowers = flowers.map(f => f.id === id ? { ...flower, waterLevel} : f);
    this.flowerStorage.next(updatedFlowers);
  }

  addFlower() {
    const flowers = this.flowerStorage.getValue();
    this.flowerStorage.next([...flowers, createFlower()]);
  }

  trimGrass() {
    const flowers = this.flowerStorage.getValue();
    const updatedFlowers = flowers
      .map(f => ({ ...f, waterLevel: Math.max(f.waterLevel - 2, 0) }));
    this.flowerStorage.next(updatedFlowers);
  }

  updateColor(id: string) {
    const flowers = this.flowerStorage.getValue();
    const flower = flowers.find(f => f.id === id);
    if(!flower){
      throw new Error('Flower not found');
    }
    let color : ColorType;
    if (flower.waterLevel <= 5) {
      color = 'green';
    } else if (flower?.waterLevel <= 10) {
      color = 'yellow';
    } else {
      color = 'brown';
    }

    const updatedFlowers = flowers.map(f => f.id === id ? { ...flower, color} : f);
    this.flowerStorage.next(updatedFlowers);
  }

  getFlowers() {
    return this.flowerStorage.asObservable();
  }
}
