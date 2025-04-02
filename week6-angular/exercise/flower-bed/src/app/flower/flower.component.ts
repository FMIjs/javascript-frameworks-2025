import { Component, input, output } from '@angular/core';
import { IFlower } from '../types/flower';

@Component({
  selector: 'app-flower',
  imports: [],
  templateUrl: './flower.component.html',
  styleUrl: './flower.component.scss'
})
export class FlowerComponent {
  flower = input<IFlower | null>(null);
  water = output<IFlower>();

  get flowerElements() {
    return Array(this.flower()?.waterLevel).fill(0).map((_, index) => index);
  }
}
