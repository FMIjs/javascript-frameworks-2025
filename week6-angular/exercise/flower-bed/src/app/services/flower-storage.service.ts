import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlower } from '../types/flower';
import { v4 } from 'uuid';
import { ColorType } from '../types/color-type';

@Injectable()
export class FlowerStorageService {
  private flowerStorage = new BehaviorSubject<IFlower[]>([
  ]);

  seedFlowers() {
    this.flowerStorage.next([
      {
        id: v4(),
        waterLevel: 1,
        color: 'green',
      },
      {
        id: v4(),
        waterLevel: 1,
        color: 'green',
      },
      {
        id: v4(),
        waterLevel: 1,
        color: 'green',
      },
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
