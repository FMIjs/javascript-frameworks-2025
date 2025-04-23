import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FlowerComponent } from '../flower/flower.component';
import { IFlower } from '../../../../server/src/types/flower';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FlowerService } from '../../services/flower.service';

@Component({
  selector: 'app-flower-bed',
  imports: [AsyncPipe, FlowerComponent, RouterOutlet],
  templateUrl: './flower-bed.component.html',
  styleUrl: './flower-bed.component.scss',
  standalone: true,
})
export class FlowerBedComponent {
  protected readonly flowerService = inject(FlowerService);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);

  flowers$ = this.flowerService.flowers$;

  constructor() {
    this.flowerService.init()
  }

  canTrimGrass$ = this.flowers$.pipe(
    map(flowers => flowers.some(flower => flower.waterLevel > 0))
  )

  waterFlower(flower: IFlower) {
    this.flowerService.waterFlower(flower.id, flower.waterLevel + 1).subscribe(console.log);
  }
  seedFlowers() {
    this.flowerService.seedFlowers().subscribe(console.log);
  }
  trimGrass() {
    this.flowerService.trimFlowers().subscribe(d => console.log(d));
  }

  addFlower() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
