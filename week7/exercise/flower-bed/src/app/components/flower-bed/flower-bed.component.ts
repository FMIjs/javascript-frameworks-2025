import { Component, inject } from '@angular/core';
import { FlowerStorageService } from '../../services/flower-storage.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FlowerComponent } from '../../flower/flower.component';
import { IFlower } from '../../types/flower';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flower-bed',
  imports: [AsyncPipe, FlowerComponent, RouterOutlet],
  templateUrl: './flower-bed.component.html',
  styleUrl: './flower-bed.component.scss',
  standalone: true,
})
export class FlowerBedComponent {
  protected readonly flowerBedService = inject(FlowerStorageService);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);

  flowers$ = this.flowerBedService.getFlowers();

  canTrimGrass$ = this.flowers$.pipe(
    map(flowers => flowers.some(flower => flower.waterLevel > 0))
  )

  waterFlower(flower: IFlower) {
    this.flowerBedService.updateWaterLevel(flower.id, flower.waterLevel + 1);
  }

  addFlower(){
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
