import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlower } from '../types/flower';
import { v4 } from 'uuid';

@Injectable()
export class FlowerStorageService {
  private flowerStorage = new BehaviorSubject<IFlower[]>([
  ]);

  seedFlowers() {
    this.flowerStorage.next([
      {
        id: v4(),
        waterLevel: 1,
        color: 1,
      },
      {
        id: v4(),
        waterLevel: 1,
        color: 1,
      },
      {
        id: v4(),
        waterLevel: 1,
        color: 1,
      },
    ])
  }

  updateWaterLevel(id: string, waterLevel: number) {
    const flowers = this.flowerStorage.getValue();
    const flower = flowers.find(f => f.id === id);
    if (flower) {
      flower.waterLevel = waterLevel;
    }
    this.flowerStorage.next(flowers);
  }

  updateColor(id: string, color: number) {
    const flowers = this.flowerStorage.getValue();
    const flower = flowers.find(f => f.id === id);
    if (flower) {
      flower.color = color;
    }
    this.flowerStorage.next(flowers);
  }

  getFlowers() {
    return this.flowerStorage.asObservable();
  }
}
