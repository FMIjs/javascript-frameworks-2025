import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlower } from '../types/flower';
import { v4 } from 'uuid';
import { ColorType } from '../types/color-type';
import { LocalStorageService } from './local-storage.service';
import { FLOWER_STORAGE_KEY } from '../constants/local-storage-keys';

const FLOWER_SEED_COUNT = 3;
const createFlower = (): IFlower => ({
    id: v4(),
    waterLevel: 1,
    // size: 1,
    color: ColorType.GREEN,
})

@Injectable()
export class FlowerStorageService {
  private flowerStorage = new BehaviorSubject<IFlower[]>([
  ]);
  private localStorageService = inject(LocalStorageService);

  constructor(){
    this.loadInitialData();
  }
  
  seedFlowers() {
    this.updateValue([
      ...Array(FLOWER_SEED_COUNT).fill(0).map(createFlower),
    ])
  }

  updateWaterLevel(id: string, waterLevel: number) {
    const flowers = this.flowerStorage.getValue();
    const flower = flowers.find(f => f.id === id);
    if(!flower){
      throw new Error('Flower not found');
    }

    const updatedFlowers = flowers.map(f => f.id === id ? { ...flower, waterLevel, size : this.calculateSize(waterLevel), color : this.calculateColor(waterLevel) } : f);
    this.updateValue(updatedFlowers);
  }

  addFlower(flower: Partial<IFlower>) {
    const flowerWithId = {
      id : v4(),
      waterLevel: flower.waterLevel ?? 1,
      color: this.calculateColor(flower.waterLevel ?? 1),
    };

    const flowers = this.flowerStorage.getValue();
    this.updateValue([...flowers, flowerWithId]);
  }

  trimGrass() {
    const flowers = this.flowerStorage.getValue();
    const updatedFlowers = flowers
      .map(f => {
        const waterLevel = Math.max(f.waterLevel - 1, 0);
        return { ...f, waterLevel, color : this.calculateColor(f.waterLevel) };
      });
    this.updateValue(updatedFlowers);
  }

  getFlowers() {
    return this.flowerStorage.asObservable();
  }

  private loadInitialData(){
    const flowers = this.localStorageService.getItem<IFlower[]>(FLOWER_STORAGE_KEY);
    if(flowers){
      this.flowerStorage.next(flowers);
    }
    else{
      this.seedFlowers();
    }
  }

  private updateValue(flowers : IFlower[]){
    this.flowerStorage.next(flowers);
    this.localStorageService.setItem(FLOWER_STORAGE_KEY, flowers);
  }

  private calculateSize(waterLevel: number) : number {
    return Math.min(Math.floor(waterLevel / 2), 1);
  }

  private calculateColor(waterLevel: number) : ColorType {
    let color : ColorType = ColorType.GREEN;
    // We are going to calculate the color based on the water level in the flower-color.directive.ts
    //   if (waterLevel <= 5) {
    //     color = ColorType.GREEN;
    //   } else if (waterLevel <= 10) {
    //     color = ColorType.YELLOW;
    //   } else {
    //     color = ColorType.BROWN;
    //   }
    
    return color;
  }
}
