import { Component, inject } from '@angular/core';
import { FlowerStorageService } from '../../services/flower-storage.service';
import { AsyncPipe } from '@angular/common';
import { FlowerComponent } from '../../flower/flower.component';
import { IFlower } from '../../types/flower';

@Component({
  selector: 'app-flower-bed',
  imports: [AsyncPipe, FlowerComponent],
  templateUrl: './flower-bed.component.html',
  styleUrl: './flower-bed.component.scss',
  standalone: true,
})
export class FlowerBedComponent {
  protected readonly flowerBedService = inject(FlowerStorageService);

  flowers$ = this.flowerBedService.getFlowers();

  waterFlower(flower: IFlower) {
    this.flowerBedService.updateWaterLevel(flower.id, flower.waterLevel + 1);
  }
}
