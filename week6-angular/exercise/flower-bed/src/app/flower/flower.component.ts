import { Component, input } from '@angular/core';
import { IFlower } from '../types/flower';

@Component({
  selector: 'app-flower',
  imports: [],
  templateUrl: './flower.component.html',
  styleUrl: './flower.component.scss'
})
export class FlowerComponent {
  flower = input<IFlower | null>(null);
}
